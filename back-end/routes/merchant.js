var express = require('express')
var router = express.Router();
let merchant = require("../controllers/merchant")

router.post("/createShop", merchant.createShop);

module.exports = router;