const bridgeStorage = [
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "sourceChain",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "destinationChain",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "sourceUserAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "destinationUserAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "sourceNftContractAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "metadata",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "transactionHash",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "count",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "nftType",
						"type": "string"
					}
				],
				"internalType": "struct NftTransferDetails",
				"name": "nftTransferDetails",
				"type": "tuple"
			},
			{
				"internalType": "string",
				"name": "signature",
				"type": "string"
			}
		],
		"name": "approveLockNft",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "stakerAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "signature",
				"type": "string"
			}
		],
		"name": "approveStake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "a",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "b",
				"type": "string"
			}
		],
		"name": "concatenate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "chain",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "txHash",
				"type": "string"
			}
		],
		"name": "getLockNftSignatures",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "id",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "sourceChain",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "destinationChain",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "sourceUserAddress",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "destinationUserAddress",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "sourceNftContractAddress",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "metadata",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "transactionHash",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "count",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "nftType",
								"type": "string"
							}
						],
						"internalType": "struct NftTransferDetails",
						"name": "transferDetails",
						"type": "tuple"
					},
					{
						"internalType": "string[]",
						"name": "signatures",
						"type": "string[]"
					}
				],
				"internalType": "struct NftTransferWithSignatures",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "chain",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "txHash",
				"type": "string"
			}
		],
		"name": "getLockNftSignaturesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "stakerAddress",
				"type": "address"
			}
		],
		"name": "getStakingSignatures",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "stakerAddress",
				"type": "address"
			}
		],
		"name": "getStakingSignaturesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "lockSignatures",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "sourceChain",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "destinationChain",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "sourceUserAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "destinationUserAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "sourceNftContractAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "metadata",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "transactionHash",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "count",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "nftType",
						"type": "string"
					}
				],
				"internalType": "struct NftTransferDetails",
				"name": "transferDetails",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "stakingSignatures",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "usedSignatures",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


export default bridgeStorage