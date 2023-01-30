const dal = require("../data-access/dal");

function selectCartsAndOrdersByUserAsync(userId) {
    return dal.executeQueryAsync(`
    SELECT shopping_carts.cart_id, order_id, creation_date, order_date, order_price
    FROM shopping_carts LEFT JOIN ORDERS
    ON shopping_carts.cart_id = orders.cart_id
    WHERE shopping_carts.user_id = ?
    ORDER BY order_date
    `, [userId]);
}

function selectCardProductsByCartId(cartId){
    return dal.executeQueryAsync(`SELECT * from cart_products WHERE cart_id = ?`,[cartId]);
}

module.exports = {
    selectCartsAndOrdersByUserAsync,
    selectCardProductsByCartId,
}