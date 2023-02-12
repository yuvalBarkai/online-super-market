const dal = require("../data-access/dal");

function insertNewProductAsync(newP, imageName) {
    return dal.executeQueryAsync("INSERT INTO products VALUES (DEFAULT, ?,?,?,?)",
        [newP.product_name, newP.category_id, newP.product_price, imageName]);
}

function updateProductAsync(product_id, newP, keepImage, imageName) {
    if (keepImage)
        return dal.executeQueryAsync(`
        UPDATE products set product_name=?, category_id=?, product_price=? 
        WHERE product_id = ?`,
            [newP.product_name, newP.category_id, newP.product_price, product_id]);
    else
        return dal.executeQueryAsync(`
            UPDATE products SET product_name=?, category_id=?, product_price=?,
            image_name=? WHERE product_id=?`,
            [newP.product_name, newP.category_id, newP.product_price, imageName, product_id]);
}

function selectImageNameByProductIdAsync(pId) {
    return dal.executeQueryAsync("SELECT image_name FROM products WHERE product_id = ?", [pId]);
}

module.exports = {
    insertNewProductAsync,
    updateProductAsync,
    selectImageNameByProductIdAsync,
}