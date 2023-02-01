const jwt = require("jsonwebtoken");
const validator = require("../utilities/validator");
const serverErrorMsg = require("../utilities/server-error-msg");
const verifyLoggedIn = require("../middlewares/verify-logged-in");
const verifyAdmin = require("../middlewares/verify-admin");
const config = require("../config.json");
const mediumLogic = require("../business/medium-logic");
const router = require("express").Router();

router.use(verifyLoggedIn);

router.get("/product-categories", async (req, res) => {
    try {
        const result = await mediumLogic.selectAllProductCategories();
        res.send(result);
    } catch (error) {
        res.status(500).send(serverErrorMsg(error));
    }
});

router.get("/products/:productName", async (req, res) => {
    try {
        if (/\d/.test(req.params.productName))
            res.status(400).send({ message: "product name param must not contain numbers" });
        else {
            const result = await mediumLogic.selectProductsByProductNameAsync(req.params.productName);
            if (result.length < 1)
                res.status(404).send({ message: "There arent any products with the name you entered" });
            else
                res.send(result);
        }
    } catch (error) {
        res.status(500).send(serverErrorMsg(error));
    }
});


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

module.exports = router;