const verifyAdmin = require("../middlewares/verify-admin");
const verifyLoggedIn = require("../middlewares/verify-logged-in");
const serverErrorMsg = require("../utilities/server-error-msg");
const fileUpload = require("express-fileUpload");
const adminLogic = require("../business/admin-logic");
const validator = require("../utilities/validator");

const router = require("express").Router();
router.use([verifyLoggedIn, verifyAdmin, fileUpload()]);

router.post("/product", async (req, res) => {
    try {
        const body = req.body;
        const image = req.files?.product_image;
        if (!image)
            res.status(400).send({ message: "Please send an image with the product" });
        else {
            const { error } = validator.newProduct(body);
            if (error)
                res.status(400).send(error.details[0]);
            else {
                console.log(body);
                const result = await adminLogic.insertNewProductAsync(body, image);
                res.status(201).send(result);
            }
        }
    } catch (error) {
        if (error.code == 'ER_DUP_ENTRY')
            res.status(400).send({ message: "That product name already exsits" });
        else
            res.status(500).send(serverErrorMsg(error));
    }
});

router.put("/product/:product_id", async (req, res) => {
    try {
        const pId = req.params.product_id;
        if (isNaN(pId))
            res.status(400).send({ message: "product_id parameter must be numeric" });
        else {
            const body = req.body;
            console.log(body);
            const { error } = validator.editProduct(body);
            if (error)
                res.status(400).send(error.details[0]);
            else if (!body.keepImage || body.keepImage == 'false') {
                const image = req.files?.product_image;
                if (!image)
                    res.status(400).send({ message: "Please send a new image if you want to change the old one" });
                else {
                    const result = await adminLogic.updateProductSwapPictureAsync(pId, body, image);
                    if (result.affectedRows < 1)
                        res.status(404).send({ message: `Error: The id ${pId} was not found` });
                    else
                        res.send(result);
                }
            }
            else {
                const result = await adminLogic.updateProductAsync(pId, body);
                if (result.affectedRows < 1)
                    res.status(404).send({ message: `Error: The id ${pId} was not found` });
                else
                    res.send(result);
            }
        }
    } catch (error) {
        if (error.code == 'ER_DUP_ENTRY')
            res.status(400).send({ message: "That product name already exsits" });
        else
            res.status(500).send(serverErrorMsg(error));
    }
});

module.exports = router;