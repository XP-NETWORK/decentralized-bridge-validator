const multiversXBridgeABI = {
    "buildInfo": {
        "rustc": {
            "version": "1.71.0-nightly",
            "commitHash": "a2b1646c597329d0a25efa3889b66650f65de1de",
            "commitDate": "2023-05-25",
            "channel": "Nightly",
            "short": "rustc 1.71.0-nightly (a2b1646c5 2023-05-25)"
        },
        "contractCrate": {
            "name": "bridge",
            "version": "0.0.0"
        },
        "framework": {
            "name": "multiversx-sc",
            "version": "0.44.0"
        }
    },
    "name": "BridgeContract",
    "constructor": {
        "inputs": [
            {
                "name": "public_key",
                "type": "Address"
            }
        ],
        "outputs": []
    },
    "endpoints": [
        {
            "name": "tokens",
            "mutability": "readonly",
            "inputs": [],
            "outputs": [
                {
                    "type": "variadic<multi<TokenInfo,TokenInfo>>",
                    "multi_result": true
                }
            ]
        },
        {
            "name": "validators",
            "mutability": "readonly",
            "inputs": [
                {
                    "name": "address",
                    "type": "Address"
                }
            ],
            "outputs": [
                {
                    "type": "Validator"
                }
            ]
        },
        {
            "name": "validatorsCount",
            "mutability": "readonly",
            "inputs": [],
            "outputs": [
                {
                    "type": "u64"
                }
            ]
        },
        {
            "name": "uniqueIdentifier",
            "mutability": "readonly",
            "inputs": [],
            "outputs": [
                {
                    "type": "variadic<bytes>",
                    "multi_result": true
                }
            ]
        },
        {
            "name": "verifySigs",
            "mutability": "mutable",
            "inputs": [
                {
                    "name": "key",
                    "type": "bytes"
                },
                {
                    "name": "message",
                    "type": "bytes"
                },
                {
                    "name": "sig",
                    "type": "bytes"
                }
            ],
            "outputs": []
        },
        {
            "name": "verifySigsAddresses",
            "mutability": "mutable",
            "inputs": [
                {
                    "name": "key",
                    "type": "Address"
                },
                {
                    "name": "message",
                    "type": "Address"
                },
                {
                    "name": "sig",
                    "type": "bytes"
                }
            ],
            "outputs": []
        },
        {
            "name": "addValidator",
            "mutability": "mutable",
            "inputs": [
                {
                    "name": "new_validator_public_key",
                    "type": "Address"
                },
                {
                    "name": "signatures",
                    "type": "List<SignatureInfo>"
                }
            ],
            "outputs": []
        },
        {
            "name": "lock721",
            "mutability": "mutable",
            "inputs": [
                {
                    "name": "token_id",
                    "type": "TokenIdentifier"
                },
                {
                    "name": "destination_chain",
                    "type": "bytes"
                },
                {
                    "name": "destination_user_address",
                    "type": "bytes"
                },
                {
                    "name": "source_nft_contract_address",
                    "type": "TokenIdentifier"
                },
                {
                    "name": "nonce",
                    "type": "u64"
                }
            ],
            "outputs": []
        },
        {
            "name": "lock1155",
            "mutability": "mutable",
            "inputs": [
                {
                    "name": "token_id",
                    "type": "TokenIdentifier"
                },
                {
                    "name": "destination_chain",
                    "type": "bytes"
                },
                {
                    "name": "destination_user_address",
                    "type": "bytes"
                },
                {
                    "name": "source_nft_contract_address",
                    "type": "TokenIdentifier"
                },
                {
                    "name": "amount",
                    "type": "BigUint"
                },
                {
                    "name": "nonce",
                    "type": "u64"
                }
            ],
            "outputs": []
        },
        {
            "name": "claimNft",
            "mutability": "mutable",
            "payableInTokens": [
                "EGLD"
            ],
            "inputs": [
                {
                    "name": "data",
                    "type": "ClaimData"
                },
                {
                    "name": "signatures",
                    "type": "List<SignatureInfo>"
                },
                {
                    "name": "uris",
                    "type": "multi<bytes,bytes>",
                    "multi_arg": true
                }
            ],
            "outputs": []
        },
        {
            "name": "collections",
            "mutability": "readonly",
            "inputs": [
                {
                    "name": "identifier",
                    "type": "bytes"
                }
            ],
            "outputs": [
                {
                    "type": "TokenIdentifier"
                }
            ]
        }
    ],
    "events": [
        {
            "identifier": "AddNewValidator",
            "inputs": [
                {
                    "name": "validator",
                    "type": "Address",
                    "indexed": true
                }
            ]
        },
        {
            "identifier": "Locked",
            "inputs": [
                {
                    "name": "token_id",
                    "type": "TokenIdentifier",
                    "indexed": true
                },
                {
                    "name": "destination_chain",
                    "type": "bytes",
                    "indexed": true
                },
                {
                    "name": "destination_user_address",
                    "type": "bytes",
                    "indexed": true
                },
                {
                    "name": "source_nft_contract_address",
                    "type": "TokenIdentifier",
                    "indexed": true
                },
                {
                    "name": "token_amount",
                    "type": "BigUint",
                    "indexed": true
                },
                {
                    "name": "nft_type",
                    "type": "bytes",
                    "indexed": true
                },
                {
                    "name": "chain",
                    "type": "bytes",
                    "indexed": true
                },
                {
                    "name": "nonce",
                    "type": "u64",
                    "indexed": true
                }
            ]
        },
        {
            "identifier": "UnLock721",
            "inputs": [
                {
                    "name": "to",
                    "type": "Address",
                    "indexed": true
                },
                {
                    "name": "nonce",
                    "type": "u64",
                    "indexed": true
                },
                {
                    "name": "contract_address",
                    "type": "TokenIdentifier",
                    "indexed": true
                }
            ]
        },
        {
            "identifier": "UnLock1155",
            "inputs": [
                {
                    "name": "to",
                    "type": "Address",
                    "indexed": true
                },
                {
                    "name": "nonce",
                    "type": "u64",
                    "indexed": true
                },
                {
                    "name": "contract_address",
                    "type": "TokenIdentifier",
                    "indexed": true
                },
                {
                    "name": "amount",
                    "type": "u64",
                    "indexed": true
                }
            ]
        },
        {
            "identifier": "Claimed",
            "inputs": [
                {
                    "name": "source_chain",
                    "type": "bytes",
                    "indexed": true
                },
                {
                    "name": "transaction_hash",
                    "type": "bytes",
                    "indexed": true
                }
            ]
        }
    ],
    "esdtAttributes": [],
    "hasCallback": true,
    "types": {
        "ClaimData": {
            "type": "struct",
            "fields": [
                {
                    "name": "token_id",
                    "type": "bytes"
                },
                {
                    "name": "source_chain",
                    "type": "bytes"
                },
                {
                    "name": "destination_chain",
                    "type": "bytes"
                },
                {
                    "name": "destination_user_address",
                    "type": "Address"
                },
                {
                    "name": "source_nft_contract_address",
                    "type": "bytes"
                },
                {
                    "name": "name",
                    "type": "bytes"
                },
                {
                    "name": "symbol",
                    "type": "bytes"
                },
                {
                    "name": "royalty",
                    "type": "BigUint"
                },
                {
                    "name": "royalty_receiver",
                    "type": "Address"
                },
                {
                    "name": "attrs",
                    "type": "bytes"
                },
                {
                    "name": "transaction_hash",
                    "type": "bytes"
                },
                {
                    "name": "token_amount",
                    "type": "BigUint"
                },
                {
                    "name": "nft_type",
                    "type": "bytes"
                },
                {
                    "name": "fee",
                    "type": "BigUint"
                }
            ]
        },
        "SignatureInfo": {
            "type": "struct",
            "fields": [
                {
                    "name": "public_key",
                    "type": "Address"
                },
                {
                    "name": "sig",
                    "type": "bytes"
                }
            ]
        },
        "TokenInfo": {
            "type": "struct",
            "fields": [
                {
                    "name": "token_id",
                    "type": "bytes"
                },
                {
                    "name": "chain",
                    "type": "bytes"
                },
                {
                    "name": "contract_address",
                    "type": "bytes"
                }
            ]
        },
        "Validator": {
            "type": "struct",
            "fields": [
                {
                    "name": "added",
                    "type": "bool"
                },
                {
                    "name": "pending_reward",
                    "type": "BigUint"
                }
            ]
        }
    }
}

export default multiversXBridgeABI