let db_config = require('../config/db_config');
let db;
let jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb').ObjectID;

module.exports.login = function (req, res) {
    db = db_config.getDb();
    db.collection("user").findOne({ phoneNumber: req.body.phoneNumber }, function (err, foundOne) {
        if (err) return res.json({ success: false, data: { message: "Server Error Mongodb!" } })
        if (!foundOne) return res.json({ success: false, data: { message: "Username and Password is Wrong!" } })
        if (foundOne.password == req.body.password) {
            let token = jwt.sign({
                email: foundOne.email,
                password: foundOne.password,
                _id: foundOne._id
            }, "agile")
            foundOne.token = token;
            db.collection("user").updateOne({ _id: ObjectID(foundOne._id) }, { $set: foundOne }, function (err, dbres) {
                if (err) return res.json({ success: false, data: { message: "Server Error Mongodb!!" } })
                else {
                    if (!foundOne.shopId) res.json({ success: true, data: { token: foundOne.token, _id: foundOne._id, code: 1 } })
                    else return res.json({ success: true, data: { token: foundOne.token, _id: foundOne._id } })
                }
            })
        } else {
            return res.json({ success: false, data: { message: "Username and Password is Wrong!" } })
        }
    })
}


module.exports.signup = function (req, res) {
    db = db_config.getDb();
    db.collection("user").findOne({ phoneNumber: req.body.phoneNumber }, function (err, foundOne) {
        if (!foundOne) {
            let data = req.body;
            data.token = "";
            db.collection('user').insertOne(data);
            db.collection("user").findOne({ phoneNumber: req.body.phoneNumber }, function (err, foundOneMore) {
                return res.json({ success: true, data: { message: "Амжилттай хадгаллаа!", _id: foundOneMore._id } })
            })
        } else {
            return res.json({ success: false, data: { message: "Энэ дугаар дээр бүртгүүлсэн байна!" } })
        }
    })
}

module.exports.getMerchData = function (req, res) {
    db = db_config.getDb();
    db.collection("merchant").findOne({ custId: req.body.custId }, function (err, foundOne) {
        if (!foundOne) {
            return res.json({ success: true, data: { merchData: foundOne } })
        } else {
            return res.json({ success: false, data: { message: "Алдаа гарлаа!" } })
        }
    })
}

module.exports.getCustData = function (req, res) {
    db = db_config.getDb();
    db.collection("user").findOne({ _id: ObjectID(req.body.custId) }, function (err, foundOne) {
        if (foundOne) {
            delete foundOne.password;
            delete foundOne.token;
            db.collection("merchant").findOne({ _id: foundOne.shopId }, function (err, merchFound) {
                if (err) console.log(err);
                foundOne.merchData = merchFound;
                return res.json({ success: true, data: { custData: foundOne } })
            })
        } else {
            return res.json({ success: false, data: { message: "Алдаа гарлаа!" } })
        }
    })
}

module.exports.checkToken = function (req, res, next) {
    db = db_config.getDb();
    let token = req.headers.token || req.headers.authorization;
    if (token) {
        db.collection("user").findOne({ token: token }, function (err, foundOne) {
            if (err) return res.json({ success: false, data: { message: "Server Error Mongodb!" } })
            else jwt.verify(token, "agile", function (err, decoded) {
                if (err) return res.json({ success: false, data: { message: "Authorization error" } })
                if (decoded) {
                    res.locals = decoded;
                    next();
                }
                else return res.json({ success: false, data: { message: "Something went wrong!!!" } })
            })
        })
    } else return res.json({ success: false, data: { message: "Please login" } })
}

module.exports.test = function (req, res) {
    db = db_config.getDb();
    db.collection("user").find({}, { projection: { content: 0 } }).toArray(function (err, blogs) {
        if (err) return res.json({ success: false, data: { message: "Something went wrong!!!" } })
        else return res.json({ success: true, data: { blogs: blogs } })
    })
}


