
var mongoose = require ('mongoose');
//const hotel = require('./hotel');
var Schema  = mongoose.Schema;

var ReservationSchema = new Schema({
    
	email : String,
    fullName : String,
    nb_enfants : Number,
    nb_adultes : Number, 
    //nb_personnes : Number,
    
    date_debut : Date,
    date_fin : Date,
   // hotels: {type: Schema.Types.ObjectId, ref: 'hotel'}
    //hotel : { type: Schema.ObjectId, ref: 'hotel' }
});

var Reservation = mongoose.model('Reservation',ReservationSchema);
module.exports = Reservation;