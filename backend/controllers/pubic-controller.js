const jwt = require("jsonwebtoken");
const validator = require("../utilities/validator");
const serverErrorMsg = require("../utilities/server-error-msg");
const config = require("../config.json");
const publicLogic = require("../business/public-logic");
const fs = require("fs");
const path = require("path");

const router = require("express").Router();

router.get("/images/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    let imageAddress = path.join(__dirname, "..", config.imagesDirName, imageName);
    if (!fs.existsSync(imageAddress))
        imageAddress = path.join(__dirname, "..", config.imagesDirName, config.notFoundImgName);

    res.sendFile(imageAddress);
});

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
        res.send(await publicLogic.selectCitiesAsync());
    } catch (error) {
        res.status(500).send(serverErrorMsg(error));
    }
});

router.post("/register/validate/part1", async (req, res) => {
    try {
        const part1 = req.body;
        const { error } = validator.registerationPart1(part1);
        if (error) {
            error.details[0].valid = false;
            res.status(400).send(error.details[0]);
        } else {
            const userByEmail = await publicLogic.selectUserByEmailAsync(part1.user_email);
            if (userByEmail.length > 0)
                res.status(401).send({ message: "That email belongs to an existing account", valid: false });
            else {
                const userByIdCard = await publicLogic.selectUserByIdAsync(part1.id_card);
                if (userByIdCard.length > 0)
                    res.status(401).send({ message: "That ID belongs to an existing account" });
                else
                    res.send({ valid: true });
            }
        }
    } catch (error) {
        res.status(500).send(serverErrorMsg(error));
    }
});

router.post("/register", async (req, res) => {
    try {
        const newUser = req.body;
        const { error } = validator.register(newUser);
        if (error)
            res.status(400).send(error.details[0]);
        else
            res.send(await publicLogic.insertNewUserAsync(newUser));
    } catch (error) {
        res.status(500).send(serverErrorMsg(error));
    }
})

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