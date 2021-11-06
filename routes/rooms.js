var express = require('express');
const Room = require('../models/roomModel');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    Room.find(function(err, data) {
       res.render('ListRoom.twig',{data})
    });
});


router.get('/add', function(req, res, next) {
    res.render('addRoom.twig')
});

router.post('/addRoom', function(req, res, next) {
    var Room1 = new Room({
        hotel: req.body.hotel,
        number: req.body.number,
        type: req.body.type,
        price: req.body.price,
        maxGuests: req.body.maxGuests,
        dateCreated: req.body.dateCreated

    });
    Room1.save();
    res.redirect("/room/");
});

router.get('/delete/:id', function(req, res, next) {
    var id = req.params.id;
    Room.findOneAndRemove({ _id: id }, function(err) {
        if (err) throw err;
    })
    res.redirect("/room/");

});


router.get('/modifier/:id', function(req, res, next) {
    var id = req.params.id;
    Room.findById({ _id: id }, function(err, data) {
            res.render('updateRoom.twig', {data })
        })
        

});
router.post('/updates/', function(req, res, next) {
    var id = req.body.id;
    Room.findById({ _id: id }, function(err, data) {
        data.hotel = req.body.hotel
        data.number = req.body.number
        data.type = req.body.type
        data.price = req.body.price
        data.maxGuests = req.body.maxGuests
        data.dateCreated = req.body.dateCreated
        data.save();
    })
    res.redirect("/room/");

});


module.exports = router;