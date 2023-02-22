function serverErrorMsg(err) {
    const errorMsg = { message: "Error: Server Error" }
    if (err.code == 'ECONNREFUSED')
        console.log("Error: The database has refused the connection");
    else
        console.log(err);

    return errorMsg;
}

module.exports = serverErrorMsg;