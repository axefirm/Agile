let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let _db;

const url = "mongodb://localhost:27017";


module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
            _db = client.db('agile');

            _db.collection("collection_seq").find({}, { projection: { content: 0 } }).toArray(function (err, found) {
                if (!found || found.length == 0) {
                    console.log("collection_seq created");
                    _db.collection("collection_seq").insertOne({ "_id": "product", "seq_val": 0 });
                    _db.collection("collection_seq").insertOne({ "_id": "merchant", "seq_val": 0 });
                    _db.collection("collection_seq").insertOne({ "_id": "user", "seq_val": 0 });
                }
            })
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    },

    getSequenceNextValue: function (input) {
        var seqDoc = _db.collection('collection_seq').findOneAndUpdate({
            query: { _id: input },
            update: { $inc: { seqValue: 1 } },
            new: true
        });
        return seqDoc.seqValue;
    }

}