var express = require('express');
var router = express.Router();
var DB = require('../utils/Database_Operations.js');
// DB.CreateDBCollection('Faculty_Feedback', 'ClassRooms');

router.all('/', function (req, res) {
    res.send("<h1>Welcome to Faculty Feedback</h1>")
});

router.get('/:id', function (req, res) {
    console.log(req)
    DB.Query('Faculty_Feedback', 'ClassRooms', {
            classroom: req.params.id
        })
        .then(function (result) {
            res.send(JSON.stringify(result));
        })
        .catch(err => {
            console.error("An Error Occoured getting the Class" + req.params.id);
            console.error(err);
        })
});

router.post('/ClassRooms', function (req, res) {
    DB.Find('Faculty_Feedback', 'ClassRooms')
        .then(function (classrooms) {
            console.log(`ClassRooms Query: ${classrooms} `)
            res.send(JSON.stringify(classrooms));
        })
        .catch(err => {
            console.error("Error Occoured getting the Class Room :" + err);

        })
});

router.post('/NewClassRoom', function (req, res) {
    if (req.headers["content-type"] == 'application/json') {
        DB.InsertOne('Faculty_Feedback', 'ClassRooms', req.body)
            .then(function (result) {
                console.log(`New ClassRoom : ${req.body.classroom} Created at ${new Date().toLocaleString()}`);
                res.send(JSON.stringify({
                    status: "success"
                }));
            })
            .catch(err => {
                console.error("Error Occured Creating New ClassRoom");
            })
    } else {
        res.send(JSON.stringify({
            status: "Failed",
            message: "Improper Content Type; JSON Expected."
        }));
    }
});

router.post('/ClassDetail', function (req, res) {
    console.log(req);
    
    DB.Query('Faculty_Feedback', 'ClassRooms', {
        classroom : req.query.classroom,
        batch :  req.query.batch
    })
    .then(function (result) {
        res.send(JSON.stringify(result));
    })
    .catch(err => {
        console.error("An Error Occoured getting the Class" + req.params.classroom + ", Batch" + req.params.batch);
        console.error(err);
    })
})

router.post('/AddFeedback', function (req, res) {
    if (req.headers["content-type"] == 'application/json') {
        DB.InsertOne('Faculty_Feedback', 'Feedback', req.body)
            .then(function (result) {
                console.log(`New FeedBack Recorded at: ${new Date().toLocaleString()}`);
                res.send(JSON.stringify({
                    status: "success"
                }));
            })
            .catch(err => {
                console.error("Error Occured Creating New ClassRoom");
            })
    } else {
        res.send(JSON.stringify({
            status: "Failed",
            message: "Improper Content Type; JSON Expected."
        }));
    }
});

module.exports = router;