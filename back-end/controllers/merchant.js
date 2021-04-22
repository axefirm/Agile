let db_config = require('../config/db_config');
let db;

function getSequenceNextValue(input) {
    db = db_config.getDb();

    var seqDoc = db.collection("collection_seq").updateOne({ _id: input }, { $inc: { seq_val: 1 } }, function (err, dbres) {
        console.log(dbres);
    })
    return 0;
    // return seqDoc.seq_val;
}


module.exports.createShop = function (req, res) {
    db = db_config.getDb();

    db.collection("merchant").findOne({ shopName: req.body.shopName }, function (err, foundOne) {
        if (err) return res.json({ success: false, data: { message: "Алдаа гарлаа!" } })
        if (!foundOne) {
            db.collection('merchant').insertOne(req.body);
            return res.json({ success: true, data: { message: "Ажилттай бүртгэлээ." } })
        } else {
            return res.json({ success: false, data: { message: "Тухайн нэртэй дэлгүүр бүртгэлтэй байна." } })
        }
    })
}

module.exports.addProduct = function (req, res)  {
    db = db_config.getDb();

    db.collection("product").findOne({ productName: req.body.productName }, function (err, foundOne) {
        if (err) return res.json({ success: false, data: { message: "Алдаа гарлаа!" } })
        if (!foundOne) {
            console.log(req.body);
            // db.collection('product').insertOne(req.body);
            return res.json({ success: true, data: { message: "Ажилттай бүртгэлээ." } })
        } else {
            return res.json({ success: false, data: { message: "Бүртгэгдсэн байна." } })
        }
    })
}

module.exports.getProducts = function (req, res) {
    db = db_config.getDb();

    db.collection("product").find({ productName: req.body.productName }, function (err, foundOne) {
        if (err) return res.json({ success: false, data: { message: "Алдаа гарлаа!" } })
        if (!foundOne) {
            db.collection('product').insertOne(req.body);
            return res.json({ success: true, data: { message: "Ажилттай бүртгэлээ." } })
        } else {
            return res.json({ success: false, data: { message: "Бүртгэгдсэн байна." } })
        }
    })
}
