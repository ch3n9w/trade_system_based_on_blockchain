var mongoose = require('./db');

var Schema = mongoose.Schema;

var CounterSchema = new Schema({
    _id: String,
    sequence_value: Number
});

var Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;
