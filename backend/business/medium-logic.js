const dal = require("../data-access/dal");

function selectCartsAndOrdersByUserAsync(userId) {
    return dal.executeQueryAsync(`
    SELECT shopping_carts.cart_id, order_id, creation_date 
    FROM shopping_carts LEFT JOIN ORDERS
    ON shopping_carts.cart_id = orders.cart_id
    WHERE shopping_carts.user_id = ?
    `, [userId]);
}

module.exports = {
    selectCartsAndOrdersByUserAsync,

}