const dal = require("../data-access/dal");
const util = require("../utilities/util");


const insertOrderAsync = (order, userId) => dal.executeQueryAsync("INSERT INTO orders VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?)",
    [userId, order.cart_id, order.order_price, order.city_id, order.street_name, util.formatDate(order.arrival_date), util.formatDate(), order.credit_card_digits]);

const insertCartProductAsync = (cart_product) => dal.executeQueryAsync("INSERT INTO cart_products VALUES(DEFAULT,?,?,?,?)",
    [cart_product.product_id, cart_product.amount, cart_product.total_price, cart_product.cart_id]);

const insertShoppingCartAsync = (userId) =>
    dal.executeQueryAsync("INSERT INTO shopping_carts VALUES (DEFAULT,?,?)", [userId, util.formatDate()]);

const deleteCartProductAsync = (cart_product_id) =>
    dal.executeQueryAsync("DELETE FROM cart_products WHERE cart_product_id = ?", [cart_product_id]);

const deleteCartProductsByCartIdAsync = (cart_id) =>
    dal.executeQueryAsync("DELETE FROM cart_products WHERE cart_id = ?", [cart_id]);

const selectProductsByProductNameAsync = (product_name) => {
    if (product_name == "all")
        return dal.executeQueryAsync("SELECT * FROM products");
    else
        return dal.executeQueryAsync(`SELECT * FROM products WHERE product_name LIKE '%${product_name}%'`);
}

const selectOrdersByDateAsync = (date) => dal.executeQueryAsync("SELECT order_id FROM orders WHERE arrival_date = ?", [util.formatDate(date)]);

const selectProductsByCategoryIdAsync = (category_id) =>
    dal.executeQueryAsync("SELECT * FROM products WHERE category_id = ?", [category_id]);

const selectAllProductCategoriesAsync = () => dal.executeQueryAsync("SELECT * FROM product_categories");

const selectCardProductsByCartId = (cartId) =>
    dal.executeQueryAsync(`SELECT * from cart_products WHERE cart_id = ?`, [cartId]);

const selectCartsAndOrdersByUserAsync = (userId) => dal.executeQueryAsync(`
    SELECT shopping_carts.cart_id, order_id, creation_date, order_date, order_price
    FROM shopping_carts LEFT JOIN ORDERS
    ON shopping_carts.cart_id = orders.cart_id
    WHERE shopping_carts.user_id = ?
    ORDER BY order_date
    `, [userId]);

module.exports = {
    selectOrdersByDateAsync,
    insertOrderAsync,
    insertCartProductAsync,
    insertShoppingCartAsync,
    deleteCartProductAsync,
    deleteCartProductsByCartIdAsync,
    selectProductsByProductNameAsync,
    selectCartsAndOrdersByUserAsync,
    selectCardProductsByCartId,
    selectAllProductCategoriesAsync,
    selectProductsByCategoryIdAsync,
}