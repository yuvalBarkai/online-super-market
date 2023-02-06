const dal = require("../data-access/dal");

function insertCartProductAsync(cart_product) {
    return dal.executeQueryAsync("INSERT INTO cart_products VALUES(DEFAULT,?,?,?,?)",
        [cart_product.product_id, cart_product.amount, cart_product.total_price, cart_product.cart_id]);
}

function deleteCartProductAsync(cart_product_id) {
    return dal.executeQueryAsync("DELETE FROM cart_products WHERE cart_product_id = ?", [cart_product_id]);
}

function selectProductsByProductNameAsync(product_name) {
    if (product_name == "all")
        return dal.executeQueryAsync("SELECT * FROM products");
    else
        return dal.executeQueryAsync(`SELECT * FROM products WHERE product_name LIKE '%${product_name}%'`);
}

function selectProductsByCategoryIdAsync(category_id) {
    return dal.executeQueryAsync("SELECT * FROM products WHERE category_id = ?", [category_id]);
}

function selectAllProductCategoriesAsync() {
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
    insertCartProductAsync,
    deleteCartProductAsync,
    selectProductsByProductNameAsync,
    selectCartsAndOrdersByUserAsync,
    selectCardProductsByCartId,
    selectAllProductCategoriesAsync,
    selectProductsByCategoryIdAsync,
}