var express = require('express');
var router = express.Router();
var User = require('../models/user')

// get a list of users from db
router.get('/', function(req, res, next) {
  User.find(function(err, data) {
     res.render('ListUsers.twig',{data})
  });
});

// to do

router.get('/adduser', function(req, res, next) {
  res.render('signup.twig')
});

router.post('/adduser', function(req, res, next) {
  res.redirect("/signup/")

  });

router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  User.findOneAndRemove({ _id: id }, function(err) {
      if (err) throw err;
  })
  res.redirect("/users/");

});

router.get('/update/:id', function(req, res, next) {
  var id = req.params.id;
  User.findById({ _id: id }, function(err, data) {
          res.render('updateUser.twig', {data })
      })
});


router.post('/updates/', function(req, res, next) {
  var id = req.body.id;
  User.findById({ _id: id }, function(err, data) {
      data.name = req.body.name
      data.email = req.body.email
      data.save();
  })
  res.redirect("/users/");

});

// search
router.post('/search/', function(req, res, next) {
  
  User.findOne({ 'name': req.body.search }, function (err, User) {
      if (err) return handleError(err);
     
    
      res.render('serarchUser.twig',{User})
     
    });

  });





module.exports = router;
