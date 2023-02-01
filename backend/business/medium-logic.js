const dal = require("../data-access/dal");

function selectProductsByProductNameAsync(product_name) {
    if (product_name == "all")
        return dal.executeQueryAsync("SELECT * FROM products");
    else
        return dal.executeQueryAsync("SELECT * FROM products WHERE product_name = ?"
            , [product_name]);
}

function selectAllProductCategories() {
    return dal.executeQueryAsync("SELECT * FROM product_categories");
}

function selectCartsAndOrdersByUserAsync(userId) {
    return dal.executeQueryAsync(`
    SELECT shopping_carts.cart_id, order_id, creation_date, order_date, order_price
    FROM shopping_carts LEFT JOIN ORDERS
    ON shopping_carts.cart_id = orders.cart_id
    WHERE shopping_carts.user_id = ?
    ORDER BY order_date
    `, [userId]);
}

function selectCardProductsByCartId(cartId) {
    return dal.executeQueryAsync(`SELECT * from cart_products WHERE cart_id = ?`, [cartId]);
}

module.exports = {
    selectProductsByProductNameAsync,
    selectCartsAndOrdersByUserAsync,
    selectCardProductsByCartId,
    selectAllProductCategories,
}