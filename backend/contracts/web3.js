var Web3 = require('web3');
var {chain_server} = require('../config');

var web3 = new Web3(chain_server);

// export default web3;
//
module.exports = web3;



