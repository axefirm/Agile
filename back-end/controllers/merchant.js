const { ObjectId } = require('bson');
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
    req.body.createdAt = new Date();
    db.collection("merchant").findOne({ shopName: req.body.shopName }, function (err, foundOne) {
        if (err) return res.json({ success: false, data: { message: "Алдаа гарлаа!" } })
        if (!foundOne) {
            db.collection('merchant').insertOne(req.body).then(result => {
                console.log(result.insertedId);
                db.collection('user').updateOne({ _id: ObjectId(req.body.custId) }, { $set: { shopId: result.insertedId } }, function (err, dbRes) {
                    if (err) throw err;
                    console.log("Shop added");
                    return res.json({ success: true, data: { message: "Ажилттай бүртгэлээ." } })
                })
            });
        } else {
            return res.json({ success: false, data: { message: "Тухайн нэртэй дэлгүүр бүртгэлтэй байна." } })
        }
    })
}

module.exports.addProduct = function (req, res) {
    db = db_config.getDb();
    req.body.createdAt = new Date();
    req.body.shopId = ObjectId(req.body.shopId)
    db.collection("product").findOne({ productName: req.body.productName, shopId: req.body.shopId }, function (err, foundOne) {
        if (err) return res.json({ success: false, data: { message: "Алдаа гарлаа!" } })
        if (!foundOne) {
            console.log(req.body);
            try {
                var inserted = db.collection('product').insertOne(req.body);
            }
            catch (error) {
                console.log("Could not insert due to " + error);
            }
            return res.json({ success: true, data: { message: "Ажилттай бүртгэлээ." } })
        } else {
            return res.json({ success: false, data: { message: "Бүртгэгдсэн байна." } })
        }
    })
}

module.exports.addCategory = function (req, res) {
    db = db_config.getDb();
    req.body.shopId = ObjectId(req.body.shopId);
    if (req.body.parentId) {
        req.body.parentId = ObjectId(req.body.parentId);
    }
    req.body.createdAt = new Date();
    console.log(req.body);
    db.collection("category").findOne({ categoryName: req.body.categoryName, shopId: req.body.shopId }, function (err, foundOne) {
        if (err) return res.json({ success: false, data: { message: "Алдаа гарлаа!" } })
        if (!foundOne) {
            console.log(req.body);
            try {
                var inserted = db.collection('category').insertOne(req.body);
            }
            catch (error) {
                console.log("Could not insert due to " + error);
            }
            return res.json({ success: true, data: { message: "Ажилттай бүртгэлээ." } })
        } else {
            return res.json({ success: false, data: { message: "Бүртгэгдсэн байна." } })
        }
    })
}


module.exports.getCategories = function (req, res) {
    db = db_config.getDb();
    db.collection("category").find({ shopId: ObjectId(req.headers.shopid) }, { projection: { content: 0 } }).toArray(function (err, categories) {
        if (err) return res.json({ success: false, data: { message: "Something went wrong!!!" } })
        else {
            var data = [];
            for (var item of categories) {
                if (item.parentId == undefined) {
                    data.push(item);
                } else {
                    for (var value of data) {
                        if (String(value._id) == String(item.parentId)) {
                            value.children = [];
                            value.children.push(item);
                        }
                    }
                }
            }
            return res.json({ success: true, data: { categories: data } })

        }
    })
}

module.exports.updateNameOfCategory = function (req, res) {

    db = db_config.getDb();
    db.collection("category").updateOne({ _id: ObjectId(req.body._id) }, { $set: { categoryName: req.body.categoryName } }, function (err, dbres) {
        if (err) return res.json({ success: false, data: { message: "Алдаа гарлаа!!" } })
        else {
            return res.json({ success: true, data: { message: "Амжилттай өөрчиллөө." } })
        }
    })
}

module.exports.deleteCategory = function (req, res) {
    db = db_config.getDb();
    db.collection("category").deleteOne({ _id: ObjectId(req.body._id) }, function (err, dbres) {
        if (err) return res.json({ success: false, data: { message: "Алдаа гарлаа!!" } })
        else {
            return res.json({ success: true, data: { message: "Амжилттай устгалаа." } })
        }
    })
}


module.exports.getProducts = function (req, res) {
    db = db_config.getDb();
    console.log(req.headers.shopid);
    db.collection("product").find({ shopId: ObjectId(req.headers.shopid) }, { projection: { content: 0 } }).toArray(function (err, products) {
        if (err) return res.json({ success: false, data: { message: "Something went wrong!!!" } })
        else {
            return res.json({ success: true, data: { products: products } })
        }
    })
}

module.exports.getProductDetail = function (req, res) {
    db = db_config.getDb();
    console.log(req.query);
    db.collection("product").findOne({ shopId: ObjectId(req.headers.shopid), _id: ObjectId(req.query.productId) }, function (err, foundOne) {
        if (err) return res.json({ success: false, data: { message: "Алдаа гарлаа!" } })
        if (foundOne) {
            return res.json({ success: true, data: { product: foundOne } })
        } else {
            return res.json({ success: false, data: { message: "Бараа олдсонгүй." } })
        }
    })
}


module.exports.updateProductDetail = function (req, res) {
    db = db_config.getDb();
    console.log(req.body);
    var id = ObjectId(req.body._id);
    delete req.body._id;
    req.body.shopId = ObjectId(req.body.shopId);
    db.collection("product").updateOne({ _id: id }, { $set: req.body }, function (err, dbres) {
        console.log(err);
        if (err) return res.json({ success: false, data: { message: "Алдаа гарлаа!!" } })
        else {
            return res.json({ success: true, data: { message: "Амжилттай өөрчиллөө." } })
        }
    })
}

module.exports.deleteProduct = function (req, res) {
    db = db_config.getDb();
    db.collection("product").deleteOne({ _id: ObjectId(req.body._id) }, function (err, dbres) {
        if (err) return res.json({ success: false, data: { message: "Алдаа гарлаа!!" } })
        else {
            return res.json({ success: true, data: { message: "Амжилттай устгалаа." } })
        }
    })
}