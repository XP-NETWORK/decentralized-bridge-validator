const evmBridgeABI = [
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "_validators",
                "type": "address[]"
            },
            {
                "internalType": "string",
                "name": "_chainSymbol",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "ECDSAInvalidSignature",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "length",
                "type": "uint256"
            }
        ],
        "name": "ECDSAInvalidSignatureLength",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "ECDSAInvalidSignatureS",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_validator",
                "type": "address"
            }
        ],
        "name": "AddNewValidator",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "sourceChain",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "transactionHash",
                "type": "string"
            }
        ],
        "name": "Claimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "destinationChain",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "destinationUserAddress",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "sourceNftContractAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "nftType",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "sourceChain",
                "type": "string"
            }
        ],
        "name": "Locked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "contractAddr",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "UnLock1155",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "contractAddr",
                "type": "address"
            }
        ],
        "name": "UnLock721",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_validator",
                "type": "address"
            },
            {
                "internalType": "bytes[]",
                "name": "sigs",
                "type": "bytes[]"
            }
        ],
        "name": "addValidator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
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
                        "internalType": "address",
                        "name": "destinationUserAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "sourceNftContractAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "royalty",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "royaltyReceiver",
                        "type": "address"
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
                        "name": "tokenAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "nftType",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Bridge.ClaimData",
                "name": "data",
                "type": "tuple"
            },
            {
                "internalType": "bytes[]",
                "name": "signatures",
                "type": "bytes[]"
            }
        ],
        "name": "claimNFT1155",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
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
                        "internalType": "address",
                        "name": "destinationUserAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "sourceNftContractAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "royalty",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "royaltyReceiver",
                        "type": "address"
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
                        "name": "tokenAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "nftType",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Bridge.ClaimData",
                "name": "data",
                "type": "tuple"
            },
            {
                "internalType": "bytes[]",
                "name": "signatures",
                "type": "bytes[]"
            }
        ],
        "name": "claimNFT721",
        "outputs": [],
        "stateMutability": "payable",
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
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "duplicateStorageMapping1155",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
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
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "duplicateStorageMapping721",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
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
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "duplicateToOriginalMapping",
        "outputs": [
            {
                "internalType": "string",
                "name": "chain",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "contractAddress",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "destinationChain",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "destinationUserAddress",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "sourceNftContractAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenAmount",
                "type": "uint256"
            }
        ],
        "name": "lock1155",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "destinationChain",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "destinationUserAddress",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "sourceNftContractAddress",
                "type": "address"
            }
        ],
        "name": "lock721",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "originalStorageMapping1155",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
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
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "originalStorageMapping721",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
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
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "originalToDuplicateMapping",
        "outputs": [
            {
                "internalType": "string",
                "name": "chain",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "contractAddress",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "selfChain",
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
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "uniqueIdentifier",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
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
            }
        ],
        "name": "validators",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "validatorsCount",
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
]

export default evmBridgeABI