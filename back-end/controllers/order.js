const { ObjectId } = require('bson');
let db_config = require('../config/db_config');
let db;


module.exports.getOrders = function (req, res) {
    db = db_config.getDb();
    console.log(req.headers.shopid);
    db.collection("order").find({ shopId: ObjectId(req.headers.shopid) }, { projection: { content: 0 } }).toArray(function (err, orders) {
        if (err) return res.json({ success: false, data: { message: "Алдаа гарлаа!!!" } })
        else {
            return res.json({ success: true, data: { orders: orders } })
        }
    })
}