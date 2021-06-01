var Web3 = require('web3');
var web3 = new Web3('ws://localhost:7545');
// var express = require('express'); var app = express();
var mongoose = require('mongoose');
var ProductModule = require('./product.js');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dapp',{useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('mongodb connection success!');
})


var Store = new web3.eth.Contract([
    {
	"inputs": [],
	"stateMutability": "nonpayable",
	"type": "constructor"
    },
    {
	"anonymous": false,
	"inputs": [
	    {
		"indexed": false,
		"internalType": "address payable",
		"name": "_dealAddress",
		"type": "address"
	    },
	    {
		"indexed": false,
		"internalType": "string",
		"name": "_message",
		"type": "string"
	    },
	    {
		"indexed": false,
		"internalType": "bool",
		"name": "result",
		"type": "bool"
	    }
	],
	"name": "AbortDealResult",
	"type": "event"
    },
    {
	"anonymous": false,
	"inputs": [
	    {
		"indexed": false,
		"internalType": "uint256",
		"name": "_productId",
		"type": "uint256"
	    },
	    {
		"indexed": false,
		"internalType": "string",
		"name": "_name",
		"type": "string"
	    },
	    {
		"indexed": false,
		"internalType": "string",
		"name": "_error",
		"type": "string"
	    }
	],
	"name": "AddProductFail",
	"type": "event"
    },
    {
	"anonymous": false,
	"inputs": [
	    {
		"indexed": false,
		"internalType": "address payable",
		"name": "_dealAddress",
		"type": "address"
	    },
	    {
		"indexed": false,
		"internalType": "uint256",
		"name": "_productId",
		"type": "uint256"
	    },
	    {
		"indexed": false,
		"internalType": "address payable",
		"name": "_seller",
		"type": "address"
	    },
	    {
		"indexed": false,
		"internalType": "address payable",
		"name": "_buyer",
		"type": "address"
	    },
	    {
		"indexed": false,
		"internalType": "uint256",
		"name": "_price",
		"type": "uint256"
	    },
	    {
		"indexed": false,
		"internalType": "uint256",
		"name": "_amount",
		"type": "uint256"
	    },
	    {
		"indexed": false,
		"internalType": "string",
		"name": "_fromWhere",
		"type": "string"
	    },
	    {
		"indexed": false,
		"internalType": "string",
		"name": "_toWhere",
		"type": "string"
	    },
	    {
		"indexed": false,
		"internalType": "uint256",
		"name": "_dealLaunchTime",
		"type": "uint256"
	    },
	    {
		"indexed": false,
		"internalType": "uint256",
		"name": "_dealPayTime",
		"type": "uint256"
	    },
	    {
		"indexed": false,
		"internalType": "uint256",
		"name": "_dealFinishedTime",
		"type": "uint256"
	    },
	    {
		"indexed": false,
		"internalType": "uint256",
		"name": "_state",
		"type": "uint256"
	    }
	],
	"name": "DealInfo",
	"type": "event"
    },
    {
	"anonymous": false,
	"inputs": [
	    {
		"indexed": false,
		"internalType": "address payable",
		"name": "_dealAddress",
		"type": "address"
	    },
	    {
		"indexed": false,
		"internalType": "string",
		"name": "_message",
		"type": "string"
	    },
	    {
		"indexed": false,
		"internalType": "bool",
		"name": "result",
		"type": "bool"
	    }
	],
	"name": "FinishDealResult",
	"type": "event"
    },
    {
	"anonymous": false,
	"inputs": [
	    {
		"indexed": false,
		"internalType": "address payable",
		"name": "_dealAddress",
		"type": "address"
	    },
	    {
		"indexed": false,
		"internalType": "string",
		"name": "_message",
		"type": "string"
	    },
	    {
		"indexed": false,
		"internalType": "bool",
		"name": "result",
		"type": "bool"
	    }
	],
	"name": "LaunchDealResult",
	"type": "event"
    },
    {
	"anonymous": false,
	"inputs": [
	    {
		"indexed": false,
		"internalType": "address payable",
		"name": "_dealAddress",
		"type": "address"
	    },
	    {
		"indexed": false,
		"internalType": "string",
		"name": "_message",
		"type": "string"
	    },
	    {
		"indexed": false,
		"internalType": "bool",
		"name": "result",
		"type": "bool"
	    }
	],
	"name": "PayDealResult",
	"type": "event"
    },
    {
	"anonymous": false,
	"inputs": [
	    {
		"indexed": false,
		"internalType": "uint256",
		"name": "_productId",
		"type": "uint256"
	    },
	    {
		"indexed": false,
		"internalType": "string",
		"name": "_name",
		"type": "string"
	    },
	    {
		"indexed": false,
		"internalType": "string",
		"name": "_descLink",
		"type": "string"
	    },
	    {
		"indexed": false,
		"internalType": "string",
		"name": "_imageLink",
		"type": "string"
	    },
	    {
		"indexed": false,
		"internalType": "uint256",
		"name": "_perPrice",
		"type": "uint256"
	    },
	    {
		"indexed": false,
		"internalType": "uint256",
		"name": "_expirationTime",
		"type": "uint256"
	    },
	    {
		"indexed": false,
		"internalType": "uint256",
		"name": "_amount",
		"type": "uint256"
	    },
	    {
		"indexed": false,
		"internalType": "string",
		"name": "_origin",
		"type": "string"
	    },
	    {
		"indexed": false,
		"internalType": "address payable",
		"name": "_owner",
		"type": "address"
	    },
	    {
		"indexed": false,
		"internalType": "address payable[10]",
		"name": "_materialDeal",
		"type": "address[10]"
	    },
	    {
		"indexed": false,
		"internalType": "uint256[10]",
		"name": "_materialAmount",
		"type": "uint256[10]"
	    }
	],
	"name": "ProductInfo",
	"type": "event"
    },
    {
	"anonymous": false,
	"inputs": [
	    {
		"indexed": false,
		"internalType": "uint256",
		"name": "_productId",
		"type": "uint256"
	    },
	    {
		"indexed": false,
		"internalType": "bool",
		"name": "result",
		"type": "bool"
	    }
	],
	"name": "SearchProductFail",
	"type": "event"
    },
    {
	"inputs": [
	    {
		"internalType": "address payable",
		"name": "_dealAddress",
		"type": "address"
	    }
	],
	"name": "abortDeal",
	"outputs": [
	    {
		"internalType": "bool",
		"name": "",
		"type": "bool"
	    }
	],
	"stateMutability": "payable",
	"type": "function"
    },
    {
	"inputs": [
	    {
		"internalType": "uint256",
		"name": "_uid",
		"type": "uint256"
	    },
	    {
		"internalType": "string",
		"name": "_name",
		"type": "string"
	    },
	    {
		"internalType": "string",
		"name": "_descLink",
		"type": "string"
	    },
	    {
		"internalType": "string",
		"name": "_imageLink",
		"type": "string"
	    },
	    {
		"internalType": "string",
		"name": "_origin",
		"type": "string"
	    },
	    {
		"internalType": "uint256",
		"name": "_expirationTime",
		"type": "uint256"
	    },
	    {
		"internalType": "uint256",
		"name": "_amount",
		"type": "uint256"
	    },
	    {
		"internalType": "uint256",
		"name": "_perPrice",
		"type": "uint256"
	    },
	    {
		"internalType": "address payable[10]",
		"name": "_materialDeal",
		"type": "address[10]"
	    },
	    {
		"internalType": "uint256[10]",
		"name": "_materialAmount",
		"type": "uint256[10]"
	    }
	],
	"name": "addNewProduct",
	"outputs": [
	    {
		"internalType": "bool",
		"name": "",
		"type": "bool"
	    }
	],
	"stateMutability": "payable",
	"type": "function"
    },
    {
	"inputs": [
	    {
		"internalType": "uint256",
		"name": "_uid",
		"type": "uint256"
	    },
	    {
		"internalType": "uint256",
		"name": "_amount",
		"type": "uint256"
	    },
	    {
		"internalType": "string",
		"name": "_toWhere",
		"type": "string"
	    },
	    {
		"internalType": "uint256",
		"name": "_dealLaunchTime",
		"type": "uint256"
	    }
	],
	"name": "launchDeal",
	"outputs": [
	    {
		"internalType": "bool",
		"name": "",
		"type": "bool"
	    }
	],
	"stateMutability": "nonpayable",
	"type": "function"
    },
    {
	"inputs": [
	    {
		"internalType": "uint256",
		"name": "_productId",
		"type": "uint256"
	    }
	],
	"name": "productInfo",
	"outputs": [
	    {
		"internalType": "bool",
		"name": "",
		"type": "bool"
	    }
	],
	"stateMutability": "nonpayable",
	"type": "function"
    },
    {
	"inputs": [
	    {
		"internalType": "uint256",
		"name": "_dealPayTime",
		"type": "uint256"
	    },
	    {
		"internalType": "address payable",
		"name": "_dealAddress",
		"type": "address"
	    }
	],
	"name": "purchaseConfirm",
	"outputs": [
	    {
		"internalType": "bool",
		"name": "",
		"type": "bool"
	    }
	],
	"stateMutability": "payable",
	"type": "function"
    },
    {
	"inputs": [
	    {
		"internalType": "uint256",
		"name": "_receivedTime",
		"type": "uint256"
	    },
	    {
		"internalType": "address payable",
		"name": "_dealAddress",
		"type": "address"
	    }
	],
	"name": "receivedConfirm",
	"outputs": [
	    {
		"internalType": "bool",
		"name": "",
		"type": "bool"
	    }
	],
	"stateMutability": "nonpayable",
	"type": "function"
    },
    {
	"inputs": [],
	"name": "value",
	"outputs": [
	    {
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	    }
	],
	"stateMutability": "view",
	"type": "function"
    }
], '0x96421a60cce5B2146c1b0169f28d0B934c7C032e');
console.log(Store.options.address);

// listen AddProductSuccess event from smart contract instance
Store.events.AddProductSuccess((err, events) => {
    if(err){
	console.log(err);
	exit(0);
    }
    // console.log('success func trigger');

    // save product data to mongodb
    var product = new ProductModule({
	_id: events.returnValues._productId,
	name: events.returnValues._name,
	descLink: events.returnValues._descLink,
	imageLink: events.returnValues._imageLink,
	perPrice: events.returnValues._perPrice,
	expirationTime: events.returnValues._expirationTime,
	amount: events.returnValues._amount,
	origin: events.returnValues._origin,
	owner: events.returnValues._owner,
	materialDeal: events.returnValues._materialDeal,
	materialAmount: events.returnValues._materialAmount
    });
    console.log(product);
    product.save((err) => {
	if(err){
	    console.log(err);
	    console.log("save product fail!");
	}else {
	    console.log('product save success!');
	}
    });
});

Store.events.AddProductFail((err, result) => {
    if(err){
	console.log(err);
	exit(0);
    }
    console.log(result);
    console.log('fail func trigger');
});


var i;
var testMaterialDeal = [];
var testMaterialAmount = [];
for(i=0;i<10;i++){
    testMaterialDeal.push('0x22cb674df7abE1fFa6140508dCe4fcD10Beb6B3a');
    testMaterialAmount.push(0);
}


Store.methods.addNewProduct(
    4,
    'rice',
    'this is test desc',
    'this is test image',
    'zhejiang',
    20210130,
    2,
    2,
    testMaterialDeal,
    testMaterialAmount
).send({from: '0x1e7f4BE402Ca56dde66c243DeaC33cF760914da7', value: 8, gas: 2100000});



