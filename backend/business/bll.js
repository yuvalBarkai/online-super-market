const dal = require("../data-access/dal");

function selectAllCategoriesAsync() {
    return dal.executeQueryAsync("SELECT * FROM product_categories");
}

function getUserByEmailAsync(email) {
    return dal.executeQueryAsync(`SELECT * FROM users WHERE user_email = ?`, [email]);
}

module.exports = {
    selectAllCategoriesAsync,
    getUserByEmailAsync
}