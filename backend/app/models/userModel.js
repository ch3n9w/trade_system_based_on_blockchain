// define user's structure
// use metamask to login automatically
var mongoose = require('./db');
// var autoIncrement = require('mongoose');

// autoIncrement.initialize(mongoose);

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: Number,
    // username: String,
    address: String,
    nonce: Number
});

// UserSchema.plugin(autoIncrement.plugin, 'User');
var User = mongoose.model('User', UserSchema);

module.exports = User;

