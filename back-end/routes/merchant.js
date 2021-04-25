var express = require('express');
var router = express.Router();
let merchant = require("../controllers/merchant");
let auth = require("../controllers/auth.js");

router.post("/createShop", merchant.createShop);
router.post("/addProduct", merchant.addProduct);
router.post("/addCategory", merchant.addCategory);
router.get("/getCategories", merchant.getCategories);
router.post("/updateNameOfCategory", merchant.updateNameOfCategory);
router.post("/updateProductDetail", merchant.updateProductDetail);
router.post("/deleteCategory", merchant.deleteCategory);
router.post("/deleteProduct", merchant.deleteProduct);
router.get("/getProducts", merchant.getProducts);
router.get("/getProductDetail", merchant.getProductDetail);

module.exports = router;