var express = require('express')
var router = express.Router();
let fileUpload = require("../controllers/fileUpload.js")

router.post("/fileUpload", fileUpload.fileUpload);

module.exports = router;