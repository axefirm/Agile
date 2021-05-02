var express = require('express')
var router = express.Router();
let auth = require("../controllers/auth.js")

router.post("/login", auth.login)
router.post("/signup", auth.signup)
router.get("/test", auth.checkToken, auth.test)
router.post("/getCustData", auth.getCustData)
router.get("/getMerchData", auth.getMerchData)
router.post("/signupByFb", auth.signupByFb)

module.exports = router;