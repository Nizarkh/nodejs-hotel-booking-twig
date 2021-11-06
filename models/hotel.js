
    var mongoose = require ('mongoose');
    var Schema  = mongoose.Schema;
    
    var HotelSchema = new Schema({
        HotelName : String,
        Location : {
            type: String,
            enum: ["Sousse", "Hammamet", "Djerba", "Tabarka", "Bizerte", "Gammart"],
            default: "Hammamet"
          }, 
	    Capacite : Number,
        Etoile: {
            type: String,
            enum: ["1", "2", "3", "4", "5", "0"],
            default: "1"
          }
        
    });
    
    var Hotel = mongoose.model('Hotel',HotelSchema);
    module.exports = Hotel;