function serverErrorMsg(err) {
    console.log(err);
    const errorMsg = { message: "Server Error" }
    if (err.code == 'ECONNREFUSED')
        errorMsg.message = "The database has refused the connection";
    return errorMsg;
}

module.exports = serverErrorMsg;