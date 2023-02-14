const verifyAdmin = require("../middlewares/verify-admin");
const verifyLoggedIn = require("../middlewares/verify-logged-in");
const serverErrorMsg = require("../utilities/server-error-msg");
const fileUpload = require("express-fileUpload");
const { v4: uuidv4 } = require("uuid");
const adminLogic = require("../business/admin-logic");
const path = require("path");


const router = require("express").Router();
router.use([verifyLoggedIn, verifyAdmin, fileUpload()]);

router.post("/product", async (req, res) => {
    try {
        const body = req.body;
        const image = req.files?.product_image;
        if (!image)
            res.status(400).send({ message: "Error: please send an image with the product" })
        else {
            // validate the body
            const result = await adminLogic.insertNewProductAsync(body, image);
            res.status(201).send(result);
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
            // validate body
            if (!body.keepImage || body.keepImage == false) {
                const image = req.files?.product_image;
                if (!image)
                    res.status(400).send({ message: "Error: please send an image with the product" });
                else {
                    const result = await adminLogic.updateProductAsync(pId, body, false, image);
                    if (result.affectedRows < 1)
                        res.status(404).send({ message: `Error: The id ${pId} was not found` });
                    else
                        res.send(result);
                }
            }
            else {
                const result = await adminLogic.updateProductAsync(pId, body, true);
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