
var mongoose = require ('mongoose');
var Schema  = mongoose.Schema;

var day = new Schema({
    day : Number,
	min : Number,
    sec : Number
});

module.exports = mongoose.model('days',day);