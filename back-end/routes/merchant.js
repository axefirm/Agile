var express = require('express');
var router = express.Router();
let merchant = require("../controllers/merchant");
let auth = require("../controllers/auth.js");

router.post("/createShop", merchant.createShop);
router.post("/addProduct", merchant.addProduct);

module.exports = router;