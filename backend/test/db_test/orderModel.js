
var mongoose = require('./db');
// var autoIncrement = require('mongoose-auto-increment');

// autoIncrement.initialize(mongoose);

// var orderCounter = new Counter({
    // _id: "order_id",
    // sequence_value: 0
// });

// orderCounter.save();

var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    _id: Number,
    dealAddress: String,
    productId: Number,
    seller: String,
    buyer: String,
    price: Number,
    amount: Number,
    fromWhere: String,
    toWhere: String,
    dealLaunchTime: Number,
    dealPayTime: Number,
    dealFinishedTime: Number,
    state: Number
});

// OrderSchema.plugin(autoIncrement.plugin, 'Order');
var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
