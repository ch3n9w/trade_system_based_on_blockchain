var abi =[
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
];

