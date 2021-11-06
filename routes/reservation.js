var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation');

const sendEmail = require('../models/send-email');
/* GET users listing. */
router.get('/', function(req, res, next) {
    Reservation.find(function(err, data) {
      
       res.render('ListResrvation.twig',{data})
    });
});


router.get('/add', function(req, res, next) {
    res.render('addReservation.twig')
});

router.post('/addReservation', function(req, res, next) {
    var Res1 = new Reservation({
        email: req.body.email,
        fullName: req.body.fullName,
        nb_enfants: req.body.nb_enfants,
        nb_adultes: req.body.nb_adultes,
        date_debut: req.body.date_debut,
        
        date_fin: req.body.date_fin,
        //hotel: mongoose.Schema.Types.ObjectId(req.body.hotelId)
        //var hotelId = mongoose.Schema.Types.ObjectId(req.body.hotelId);

  
    //hotel : { type: Schema.ObjectId, ref: 'Hotel' }
    });
   
    Res1.save();
    sendEmail(Res1.email, 'Resrvation have been approved', 'You resrevartion have been approved by '+Res1.fullName+' from '+Res1.date_debut.toLocaleDateString("en-US")+' to '+ Res1.date_fin.toLocaleDateString("en-US") );
    res.redirect("/reservation/");
});


router.get('/delete/:id', function(req, res, next) {
    var id = req.params.id;
    Reservation.findOneAndRemove({ _id: id }, function(err) {
        if (err) throw err;
    })
    res.redirect("/reservation/");

});


router.get('/modifier/:id', function(req, res, next) {
    var id = req.params.id;
    Reservation.findById({ _id: id }, function(err, data) {
            res.render('updateReservation.twig', {data })
        })
        

});
router.post('/updates/', function(req, res, next) {
    var id = req.body.id;
    Reservation.findById({ _id: id }, function(err, data) {
        data.email = req.body.email
        data.fullName = req.body.fullName
        data.nb_enfants = req.body.nb_enfants
        data.nb_adultes = req.body.nb_adultes
        data.date_debut = req.body.date_debut
        data.date_fin = req.body.date_fin
        data.save();
    })
    res.redirect("/reservation/");

});

// search
router.post('/search/', function(req, res, next) {
  
    Reservation.findOne({ 'fullName': req.body.search }, function (err, Reservation) {
        if (err) return handleError(err);
       
      
        res.render('serarchRes.twig',{Reservation})
       
      });

    });


module.exports = router;