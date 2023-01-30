const jwt = require("jsonwebtoken");
const validator = require("../utilities/validator");
const serverErrorMsg = require("../utilities/server-error-msg");
const verifyLoggedIn = require("../middlewares/verify-logged-in");
const verifyAdmin = require("../middlewares/verify-admin");
const config = require("../config.json");
const mediumLogic = require("../business/medium-logic");
const router = require("express").Router();

router.use(verifyLoggedIn);

router.get("/carts-orders/:userId", async (req, res) => {
    try {
        if (isNaN(req.params.userId))
            res.status(400).send({ message: "Error: the userId parameter needs to be numberic" });
        else {
            const result = await mediumLogic.selectCartsAndOrdersByUserAsync(req.params.userId);
            res.send(result);
        }
    }
    catch (error) {
        res.status(500).send(serverErrorMsg(error));
    }
});

router.get("/cart-products/:cartId", async (req, res) => {
    try {
        const cart_id = req.params.cartId;
        if (isNaN(cart_id))
            res.status(400).send({ message: "Error: the userId parameter needs to be numberic" });
        else {
            const result = await mediumLogic.selectCardProductsByCartId(cart_id);
            if (!result || result.length == 0)
                res.status(404).send({ message: `Cart No ${cart_id} was not found` })
            else
                res.send(result);
        }
    } catch (error) {
        res.status(500).send(serverErrorMsg(error));
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