const jwt = require("jsonwebtoken");
const validator = require("../validations/validator");
const serverErrorMsg = require("../utilities/server-error-msg");
const verifyLoggedIn = require("../middlewares/verify-logged-in");
const verifyAdmin = require("../middlewares/verify-admin");
const config = require("../config.json");
const bll = require("../business/public-logic");
const router = require("express").Router();


router.use(verifyLoggedIn);

router.get("/test", (req, res) => {
    res.send(req.user);
});

router.use(verifyAdmin);

router.get("/admin/test", (req, res) => {
    res.send(req.user);
});

module.exports = router;