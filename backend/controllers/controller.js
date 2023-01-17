const router = require("express").Router();
const bll = require("../business/bll");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const verifyLoggedIn = require("../middlewares/verify-logged-in");
const validator = require("../validations/validator");
const serverErrorMsg = require("../utilities/server-error-msg");
const verifyAdmin = require("../middlewares/verify-admin");

router.post("/login", async (req, res) => {
    try {
        const body = req.body;
        const { error } = validator.login(body);
        if (error)
            res.status(400).send(error.details[0]);
        else {
            const user = await bll.getUserByEmailAsync(body.user_email);
            if (!user || user.length < 1)
                res.status(401).send({ message: "Incorrect Email" });
            else if (user[0].password != body.password)
                res.status(401).send({ message: "Incorrect Password" });
            else {
                user[0].token = jwt.sign({ user: user[0] }, config.jwtEncriptionKey, { expiresIn: config.tokenExpirationTime });
                const { password, ...userInfo } = user[0];
                res.send(userInfo);
            }
        }
    } catch (error) {
        res.status(500).send(serverErrorMsg(error));
    }
});

router.use(verifyLoggedIn);

router.get("/test", (req, res) => {
    res.send(req.user);
});

router.use(verifyAdmin);

router.get("/admin/test", (req, res) => {
    res.send(req.user);
});

module.exports = router;