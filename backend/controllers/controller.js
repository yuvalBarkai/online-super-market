const router = require("express").Router();
const bll = require("../business/bll");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

router.get("/test", async (req, res) => {
    try {
        const result = await bll.selectAllCategoriesAsync();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const body = req.body;
        // validation

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
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server Error" });
    }
});

module.exports = router;