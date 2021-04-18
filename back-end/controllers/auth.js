let db_config = require('../config/db_config');
let db;

module.exports.login = function (req, res) {
    db = db_config.getDb();
    db.collection("user").findOne({ phone: req.body.phone }, function (err, foundOne) {
        if (err) return res.json({ success: false, data: { message: "Server Error Mongodb!" } })
        if (!foundOne) return res.json({ success: false, data: { message: "Username and Password is Wrong!" } })
        if (foundOne.password == req.body.password) {
            // let token = jwt.sign({
            //   email: foundOne.email,
            //   password: foundOne.password,
            //   _id:foundOne._id
            // }, "lifeisbene")
            // foundOne.token = token;
            // db.collection("admin").updateOne({email: req.body.email}, {$set: foundOne}, function(err, dbres){
            //   if(err) return res.json({success: false, data: {message: "Server Error Mongodb!!"}})
            //   else return res.json({success: true, data: {token: foundOne.token, _id: foundOne._id}})
            // })
        } else {
            return res.json({ success: false, data: { message: "Username and Password is Wrong!" } })
        }
    })
}


module.exports.signup = function (req, res) {
    db = db_config.getDb();
    db.collection("user").findOne({ phoneNumber: req.body.phoneNumber }, function (err, foundOne) {
        if (!foundOne) {
            db.collection('user').insertOne(req.body);
            return res.json({ success: true, data: { message: "Registered successfully!" } })
        } else {
            return res.json({ success: false, data: { message: "Already registered!" } })
        }
    })
}


module.exports.test = function (req, res) {
    db = db_config.getDb();
    db.collection("user").find({}, { projection: { content: 0 } }).toArray(function (err, blogs) {
        if (err) return res.json({ success: false, data: { message: "Something went wrong!!!" } })
        else return res.json({ success: true, data: { blogs: blogs } })
    })
}
