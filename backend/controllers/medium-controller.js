const jwt = require("jsonwebtoken");
const validator = require("../validations/validator");
const serverErrorMsg = require("../utilities/server-error-msg");
const verifyLoggedIn = require("../middlewares/verify-logged-in");
const verifyAdmin = require("../middlewares/verify-admin");
const config = require("../config.json");
const mediumLogic = require("../business/medium-logic");
const router = require("express").Router();

router.use(verifyLoggedIn);

router.get("/carts/:userId", async (req, res) => {
    try {
        if (isNaN(req.params.userId))
            res.status(400).send({ message: "Error: the userId parameter needs to be numberic" });
        else {
            const result = await mediumLogic.selectCartsAndOrdersByUserAsync(req.params.userId);
            res.send(result);
        }
    }
    catch (error) {
        serverErrorMsg(error);
    }
});

router.get("/test", (req, res) => {
    res.send(req.userInfo);
});

router.use(verifyAdmin);

router.get("/admin/test", (req, res) => {
    res.send(req.userInfo);
});

module.exports = router;