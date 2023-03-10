const mySql = require("mysql");
const config = require("../config.json");

const pool = mySql.createPool({
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    database: config.dbName,
});

function executeQueryAsync(sqlCmd, values) {
    return new Promise((resolve, reject) => {
        pool.query(sqlCmd, values, (err, result) => {
            if (err)
                reject(err);
            else
                resolve(result);
        })
    })
}

module.exports = { executeQueryAsync }