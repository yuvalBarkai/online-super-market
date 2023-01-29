const dal = require("../data-access/dal");

function selectUserByEmailAsync(email) {
    return dal.executeQueryAsync("SELECT * FROM users WHERE user_email = ?", [email]);
}

function selectNumberOfOrdersAsync() {
    return dal.executeQueryAsync("SELECT COUNT(order_id) number_of_orders FROM orders");
}

function selectNumberOfProductsAsync() {
    return dal.executeQueryAsync("SELECT COUNT(product_id) number_of_products FROM products");
}

function selectCitiesAsync() {
    return dal.executeQueryAsync("SELECT * FROM cities");
}


module.exports = {
    selectUserByEmailAsync,
    selectNumberOfOrdersAsync,
    selectNumberOfProductsAsync,
    selectCitiesAsync
}