let db_config = require('../config/db_config');
let db;
let jwt = require('jsonwebtoken');
ObjectID = require('mongodb').ObjectID;

module.exports.login = function (req, res) {
    db = db_config.getDb();
    db.collection("user").findOne({ phone: req.body.phone }, function (err, foundOne) {
        if (err) return res.json({ success: false, data: { message: "Server Error Mongodb!" } })
        if (!foundOne) return res.json({ success: false, data: { message: "Username and Password is Wrong!" } })
        if (foundOne.password == req.body.password) {
            let token = jwt.sign({
                email: foundOne.email,
                password: foundOne.password,
                _id: foundOne._id
            }, "agile")
            foundOne.token = token;
            db.collection("admin").updateOne({ _id: ObjectID(foundOne._id) }, { $set: foundOne }, function (err, dbres) {
                if (err) return res.json({ success: false, data: { message: "Server Error Mongodb!!" } })
                else return res.json({ success: true, data: { token: foundOne.token, _id: foundOne._id } })
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
            return res.json({ success: true, data: { message: "Registered successfully!" } })
        } else {
            return res.json({ success: false, data: { message: "Already registered!" } })
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
