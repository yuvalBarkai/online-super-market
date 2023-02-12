const verifyAdmin = require("../middlewares/verify-admin");
const verifyLoggedIn = require("../middlewares/verify-logged-in");
const serverErrorMsg = require("../utilities/server-error-msg");
const fileUpload = require("express-fileUpload");
const { v4: uuidv4 } = require("uuid");
const adminLogic = require("../business/admin-logic");
const path = require("path");
const fs = require("fs");

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
            image.name = `${uuidv4()}.${image.name.split(".").pop()}`;
            const absolutePath = path.join(__dirname, "..", "images", image.name);
            await image.mv(absolutePath);
            const result = await adminLogic.insertNewProductAsync(body, image.name);
            res.status(201).send(result);
        }
    } catch (error) {
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
            if (body.keepImage == false) {
                const currentImage = await adminLogic.selectImageNameByProductIdAsync(pId);
                const currentImagePath = path.join(__dirname, "..", "images", currentImage[0].image_name);
                if (fs.existsSync(currentImagePath))
                    fs.unlinkSync(currentImagePath); // deletes the current image if it exists
                const image = req.files?.product_image;
                if (!image)
                    res.status(400).send({ message: "Error: please send an image with the product" });
                else {
                    image.name = `${uuidv4()}.${image.name.split(".").pop()}`;
                    const absolutePath = path.join(__dirname, "..", "images", image.name);
                    await image.mv(absolutePath);
                    const result = await adminLogic.updateProductAsync(pId, body, false, image.name);
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
        res.status(500).send(serverErrorMsg(error));
    }
});

module.exports = router;