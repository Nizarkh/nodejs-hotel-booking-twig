var express = require('express');
var router = express.Router();
var day = require('../models/day')
/* GET users listing. */
router.get('/', function(req, res, next) {
    day.find(function(err, data) {
       res.render('ListDay.twig',{data})
    });
});


router.get('/add', function(req, res, next) {
    res.render('addDay.twig')
});

router.post('/addday', function(req, res, next) {
    var day1 = new day({
        day: req.body.day,
        min: req.body.min,
        sec: req.body.sec
    });
    day1.save();
    res.redirect("/day/");
});

router.get('/delete/:id', function(req, res, next) {
    var id = req.params.id;
    day.remove({ _id: id }, function(err) {
        if (err) throw err;
    })
    res.redirect("/day/");

});
module.exports = router;