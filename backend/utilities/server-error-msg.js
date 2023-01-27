function serverErrorMsg(err) {
    console.log(err);
    const errorMsg = { message: "Error: Server Error" }
    if (err.code == 'ECONNREFUSED') {
        console.log("Error: The database has refused the connection");
    }
    return errorMsg;
}

module.exports = serverErrorMsg;