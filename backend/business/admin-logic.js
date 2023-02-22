const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const config = require("../config.json");
const dal = require("../data-access/dal");

async function insertNewProductAsync(newP, image) {
    image.name = `${uuidv4()}.${image.name.split(".").pop()}`;
    const absolutePath = path.join(__dirname, "..", config.imagesDirName, image.name);
    await image.mv(absolutePath);
    return dal.executeQueryAsync("INSERT INTO products VALUES (DEFAULT, ?,?,?,?)",
        [newP.product_name, newP.category_id, newP.product_price, image.name]);
}

function updateProductAsync(product_id, newP) {
    return dal.executeQueryAsync(`
    UPDATE products set product_name=?, category_id=?, product_price=? 
    WHERE product_id = ?`,
        [newP.product_name, newP.category_id, newP.product_price, product_id]);
}

async function updateProductSwapPictureAsync(product_id, newP, image) {
    const currentImage = await dal
        .executeQueryAsync("SELECT image_name FROM products WHERE product_id = ?", [product_id]);
    const currentImagePath = path.join(__dirname, "..", config.imagesDirName, currentImage[0].image_name);
    if (fs.existsSync(currentImagePath))
        fs.unlinkSync(currentImagePath); // deletes the current image if it exists

    image.name = `${uuidv4()}.${image.name.split(".").pop()}`;
    const result = await dal.executeQueryAsync(`
        UPDATE products SET product_name=?, category_id=?, product_price=?,
        image_name=? WHERE product_id=?`,
        [newP.product_name, newP.category_id, newP.product_price, image.name, product_id]);
    if (result.affectedRows > 0) {
        const absolutePath = path.join(__dirname, "..", "images", image.name);
        await image.mv(absolutePath); // saves the new picture
    }
    return result;
}
module.exports = {
    insertNewProductAsync,
    updateProductAsync,
    updateProductSwapPictureAsync
}