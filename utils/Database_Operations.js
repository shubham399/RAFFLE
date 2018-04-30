var MongoClient = require('mongodb').MongoClient;
var Config = require('../config/config.js')
var url = Config.test.connection_url;

var CreateDBCollection = (DBName, CollectionName) => {
    url = url + DBName;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log(`Database  ${DBName} created: at ${new Date().toLocaleString()}`);
        var dbo = db.db(DBName);
        dbo.createCollection(CollectionName, function (err, res) {
            if (err) throw err;
            console.log(`Database  ${CollectionName} created: at ${new Date().toLocaleString()}`);
            db.close();
        });
    });
}

var InsertOne = (DBName, CollectionName, DataObject) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DBName);
        dbo.collection(CollectionName).insertOne(DataObject, function (err, res) {
            if (err) throw err;
            console.log(`1 document inserted into DB: ${DBName}, Collection: ${CollectionName} at ${new Date().toLocaleString()}`);
            db.close();
        });
    });
}

var Find = (DBName, CollectionName) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DBName);
        dbo.collection(CollectionName).find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

var FindOne = (DBName, CollectionName) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DBName);
        dbo.collection(CollectionName).findOne({}, function (err, result) {
            if (err) throw err;
            console.log(result.name);
            db.close();
        });
    });
}

var Query = (DBName, CollectionName, Query) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DBName);
        dbo.collection(CollectionName).find(Query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            dbclose();
        });
    });
}

var DeleteOne = (DBName, CollectionName, DeleteQuery) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DBName);
        dbo.collection(CollectionName).deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log(`Mongo: ${obj.result.n} document(s) deleted from ${DBName + "->" + CollectionName } at ${new Date().toLocaleString()}`);
            db.close();
        });
    });
}

var DeleteMany = (DBName, CollectionName, DeleteQuery) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DBName);
        dbo.collection(CollectionName).deleteMany(DeleteQuery, function (err, obj) {
            if (err) throw err;
            console.log(`Mongo: ${obj.result.n} document(s) deleted from ${DBName + "->" + CollectionName } at ${new Date().toLocaleString()}`);
            db.close();
        });
    });
}

var Sort = (DBName, CollectionName, SortQuery) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DBName);
        dbo.collection(CollectionName).find().sort(SortQuery).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

var UpdateOne = (DBName, CollectionName, Query, UpdateValues) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DBName);
        var newvalues = {
            $set: UpdateValues
        };
        dbo.collection(CollectionName).updateOne(Query, newvalues, function (err, res) {
            if (err) throw err;
            console.log(res.result.nModified + ` document(s) updated at ${new Date().toLocaleString()}`);
            db.close();
        });
    });
}
var UpdateMany = (DBName, CollectionName, Query, UpdateValues) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DBName);
        var newvalues = {
            $set: UpdateValues
        };
        dbo.collection(CollectionName).updateMany(Query, newvalues, function (err, res) {
            if (err) throw err;
            console.log(res.result.nModified + ` document(s) updated at ${new Date().toLocaleString()}`);
            db.close();
        });
    });
}


// DB.CreateDBCollection('Result_analyzer', 'Results');
// DB.InsertOne('Result_analyzer', 'Results', Json);
// DB.Find('Result_analyzer', 'Results');

exports.CreateDBCollection = CreateDBCollection;
exports.InsertOne = InsertOne;
exports.Find = Find;
exports.FindOne = FindOne;
exports.Query = Query;
exports.DeleteOne = DeleteOne;
exports.DeleteMany = DeleteMany;
exports.Sort = Sort;
exports.UpdateMany = UpdateMany;
exports.UpdateOne = UpdateOne;