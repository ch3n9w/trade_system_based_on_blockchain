/*
 * [2021-2-1] 抛弃truffle框架，写测试脚本
 * */


var Web3 = require('web3');
var Product = require('../app/models/productModel');

var web3 = new Web3('ws://localhost:7545');

var storeInstance = require('../contracts/storeInstance');

// [2021-2-2] can not ensure connection success even you can print contracts' address
// console.log(Store.options.address);


