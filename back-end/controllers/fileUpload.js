let db_config = require('../config/db_config');
let db;
let jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb').ObjectID;

module.exports.fileUpload = function (req, res) {
    console.log(req);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }


    sampleFile = req.files.files;
    console.log(sampleFile);
    uploadPath = __dirname + '../../public/photo/' + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err)
            return res.json({ success: true, data: { message: "Алдаа гарлаа!" } })

        res.json({ success: true, data: { path: sampleFile.name } });
    });
}


