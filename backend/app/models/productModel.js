// 定义商品存储的数据结构
var mongoose = require('./db');

// try to quote this line, because it is useless according to documentation
// mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    _id: Number,
    name: String,
    // descLink: String,
    imageLink: String,
    perPrice: Number,
    expirationTime: Number,
    amount: Number,
    remain: Number, // 2021.3.26 add remain to display
    origin: String,
    owner: String, // 这里是要将地址用字符串形式存储还是以其他方式存储是个问题
    productType: Number, // 1 present product, 2 present seed , 3 present pesticide
    materialDeal: [String], // 合成一个字符串用分割符号分割
    materialAmount: [Number], // 同样
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
