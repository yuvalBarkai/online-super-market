const dal = require("../data-access/dal");

function getUserByEmailAsync(email) {
    return dal.executeQueryAsync(`SELECT * FROM users WHERE user_email = ?`, [email]);
}

module.exports = {
    getUserByEmailAsync
}