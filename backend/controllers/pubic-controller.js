const jwt = require("jsonwebtoken");
const validator = require("../validations/validator");
const serverErrorMsg = require("../utilities/server-error-msg");
const config = require("../config.json");
const publicLogic = require("../business/public-logic");
const router = require("express").Router();

router.get("/orders/amount", async (req, res) => {
    try {
        const result = await publicLogic.selectNumberOfOrdersAsync();
        res.send(result[0]);
    } catch (error) {
        res.status(500).send(serverErrorMsg(error));
    }
});

router.get("/products/amount", async (req, res) => {
    try {
        const result = await publicLogic.selectNumberOfProductsAsync();
        res.send(result[0]);
    } catch (error) {
        res.status(500).send(serverErrorMsg(error));
    }
});

router.get("/cities", async (req, res) => {
    try {
        const result = await publicLogic.selectCitiesAsync();
        res.send(result);
    } catch (error) {
        res.status(500).send(serverErrorMsg(error));
    }
});

router.post("/login", async (req, res) => {
    try {
        const body = req.body;
        const { error } = validator.login(body);
        if (error)
            res.status(400).send(error.details[0]);
        else {
            const user = await publicLogic.selectUserByEmailAsync(body.user_email);
            if (!user || user.length < 1)
                res.status(401).send({ message: "Incorrect Email" });
            else if (user[0].password != body.password)
                res.status(401).send({ message: "Incorrect Password" });
            else {
                const { password, ...userInfo } = user[0];
                const token = jwt.sign({ userInfo }, config.jwtEncriptionKey, { expiresIn: config.tokenExpirationTime });
                res.send({ token });
            }
        }
    } catch (error) {
        res.status(500).send(serverErrorMsg(error));
    }
});



module.exports = router;