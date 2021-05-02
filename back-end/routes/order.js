var express = require('express');
var router = express.Router();
let order = require("../controllers/order");

router.get("/getOrders", order.getOrders);
router.post("/order", order.order);

module.exports = router;