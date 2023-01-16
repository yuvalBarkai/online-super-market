const jwt = require("jsonwebtoken");
const config = require("../config.json");

/**
 * Verification middleware that validates the token
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @param {() => void} next keeps the pipeline going
 * 
 * Sends either status 401 (not logged in) or 403 (session is expired).
 * Otherwise addes the user info to req and goes next()
 */
function verifyLoggedIn(req, res, next) {
    if (!req.headers.authorization)
        return res.status(401).send({ message: "Please send an authorization token" });
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
        return res.status(401).send({ message: "Please send an authorization token (with bearer tag behind it)" });
    jwt.verify(token, config.jwtEncriptionKey, (err, decodedToken) => {
        if (err) {
            if (err.message == "jwt expired")
                res.status(403).send({ message: "Your login session has expired" });
            else
                res.status(401).send({ message: "You are not logged-in" });
        }
        else {
            req.user = decodedToken.user;
            next();
        }
    });
}

module.exports = verifyLoggedIn;