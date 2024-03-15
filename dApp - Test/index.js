// var {Web3} = require('web3');
// var contract;
// var web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
// // var web3 = new Web3("ws://localhost:7545");
// var address = "0x9074cFfa7c76b5fd1be474965C53ED442cD8F9F6";
// var abi =[
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "",
//           "type": "bytes32"
//         }
//       ],
//       "name": "hashedData",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "author",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "id",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "date",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "model",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [],
//       "name": "gett",
//       "outputs": [
//         {
//           "internalType": "uint8",
//           "name": "",
//           "type": "uint8"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "_author",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "_id",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "_date",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "_model",
//           "type": "string"
//         }
//       ],
//       "name": "hashAndStoreData",
//       "outputs": [
//         {
//           "internalType": "bytes32",
//           "name": "",
//           "type": "bytes32"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "_hash",
//           "type": "bytes32"
//         }
//       ],
//       "name": "dehashData",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "author",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "id",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "date",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "model",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     }
//   ]
// contract = new web3.eth.Contract(abi, address)

// contract.methods.gett().call().then(function(val){
//     console.log(val);
// })
var {Web3} = require('web3');
const web3 = new Web3(window.ethereum);
const contractAddress = "0xEf4A9B3aa3D7edA629EDEB6A97e56E1e5a26adB6";
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_model",
				"type": "string"
			}
		],
		"name": "hashAndStoreData",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hash",
				"type": "bytes32"
			}
		],
		"name": "dehashData",
		"outputs": [
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "model",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "gett",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "hashedData",
		"outputs": [
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "model",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contract = new web3.eth.Contract(abi, contractAddress);

// Example function call
contract.methods.gett().call()
  .then(function(val) {
    console.log("Value returned by gett():", val);
  })
  .catch(function(err) {
    console.error("Error:", err);
  });


