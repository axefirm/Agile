var express = require('express')
var router = express.Router();
let auth = require("../controllers/auth.js")

router.post("/login", auth.login)
router.post("/signup", auth.signup)
router.get("/test",auth.checkToken, auth.test)

module.exports = router;