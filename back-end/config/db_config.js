let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let _db;

const url = "mongodb://localhost:27017";

// MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//     _db = client.db('agile');
//     module.exports.db = _db;
// });

// getDb: function() {
//     return _db;
//   }


module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
            _db = client.db('agile');
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    }
}