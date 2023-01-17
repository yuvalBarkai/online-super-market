/**
 * Verification middleware that validates if the user is an admin
 * 
 * *Should be used after the verify-logged-in middleware. 
 * 
 * @param {Request} req The request object
 * @param {Request} res The response object
 * @param {() => void} next keeps the pipeline going
 * 
 * If the user is not in the admin list it sends status 401 (Unauthorized (admin)).
 * Otherwise goes next().
 */
function verifyAdmin(req, res, next) {
    if (!req.user) {
        res.status(500).send({ message: "Server Error: Missing user information" });
    }
    else if (req.user.is_admin == 1) {
        next();
    }
    else
        res.status(401).send({ message: "Unauthorized (admin)" });
}

module.exports = verifyAdmin;