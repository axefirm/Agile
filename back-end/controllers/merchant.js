let db_config = require('../config/db_config');
let db;

module.exports.createShop = function (req, res) {
    db = db_config.getDb();

    db.collection("merchant").findOne({ shopName: req.body.shopName }, function (err, foundOne) {
        if (err) return res.json({ success: false, data: { message: "Something went wrong!!!" } })
        if (!foundOne) {
            db.collection('merchant').insertOne(req.body);
            return res.json({ success: true, data: { message: "Inserted" } })
        } else {
            return res.json({ success: false, data: { message: "Already registered!" } })
        }
    })
}
