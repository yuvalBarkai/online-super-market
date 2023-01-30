const dal = require("../data-access/dal");

function selectUserByEmailAsync(email) {
    return dal.executeQueryAsync("SELECT * FROM users WHERE user_email = ?", [email]);
}

function selectUserByIdAsync(id_card) {
    return dal.executeQueryAsync("SELECT * FROM users WHERE id_card = ?", [id_card]);
}

function insertNewUserAsync(newUser) {
    return dal.executeQueryAsync("INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, DEFAULT)",
        [newUser.first_name, newUser.last_name, newUser.user_email, newUser.id_card,
        newUser.password, newUser.city_id, newUser.street_name]);
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
    selectUserByIdAsync,
    insertNewUserAsync,
    selectNumberOfOrdersAsync,
    selectNumberOfProductsAsync,
    selectCitiesAsync
}