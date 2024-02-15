const bridgeStorageABI = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'bootstrapValidator',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'chain',
                        type: 'string',
                    },
                    {
                        internalType: 'uint256',
                        name: 'fee',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct ChainFee[]',
                name: 'bootstrapChainFee',
                type: 'tuple[]',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'string',
                        name: 'sourceChain',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'destinationChain',
                        type: 'string',
                    },
                    {
                        internalType: 'address',
                        name: 'destinationUserAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'sourceNftContractAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'string',
                        name: 'name',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'symbol',
                        type: 'string',
                    },
                    {
                        internalType: 'uint256',
                        name: 'royalty',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'royaltyReceiver',
                        type: 'address',
                    },
                    {
                        internalType: 'string',
                        name: 'metadata',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'transactionHash',
                        type: 'string',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'string',
                        name: 'nftType',
                        type: 'string',
                    },
                    {
                        internalType: 'uint256',
                        name: 'fee',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct NftTransferDetails',
                name: 'nftTransferDetails',
                type: 'tuple',
            },
            {
                internalType: 'string',
                name: 'signature',
                type: 'string',
            },
        ],
        name: 'approveLockNft',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'stakerAddress',
                type: 'address',
            },
            {
                internalType: 'string',
                name: 'signature',
                type: 'string',
            },
        ],
        name: 'approveStake',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        name: 'chainEpoch',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        name: 'chainFee',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'chainFeeVoted',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'chainFeeVotes',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'chain',
                type: 'string',
            },
            {
                internalType: 'uint256',
                name: 'fee',
                type: 'uint256',
            },
        ],
        name: 'changeChainFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_validatorAddress',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: '_status',
                type: 'bool',
            },
        ],
        name: 'changeValidatorStatus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'a',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'b',
                type: 'string',
            },
        ],
        name: 'concatenate',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'chain',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'txHash',
                type: 'string',
            },
        ],
        name: 'getLockNftSignatures',
        outputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: 'uint256',
                                name: 'tokenId',
                                type: 'uint256',
                            },
                            {
                                internalType: 'string',
                                name: 'sourceChain',
                                type: 'string',
                            },
                            {
                                internalType: 'string',
                                name: 'destinationChain',
                                type: 'string',
                            },
                            {
                                internalType: 'address',
                                name: 'destinationUserAddress',
                                type: 'address',
                            },
                            {
                                internalType: 'address',
                                name: 'sourceNftContractAddress',
                                type: 'address',
                            },
                            {
                                internalType: 'string',
                                name: 'name',
                                type: 'string',
                            },
                            {
                                internalType: 'string',
                                name: 'symbol',
                                type: 'string',
                            },
                            {
                                internalType: 'uint256',
                                name: 'royalty',
                                type: 'uint256',
                            },
                            {
                                internalType: 'address',
                                name: 'royaltyReceiver',
                                type: 'address',
                            },
                            {
                                internalType: 'string',
                                name: 'metadata',
                                type: 'string',
                            },
                            {
                                internalType: 'string',
                                name: 'transactionHash',
                                type: 'string',
                            },
                            {
                                internalType: 'uint256',
                                name: 'tokenAmount',
                                type: 'uint256',
                            },
                            {
                                internalType: 'string',
                                name: 'nftType',
                                type: 'string',
                            },
                            {
                                internalType: 'uint256',
                                name: 'fee',
                                type: 'uint256',
                            },
                        ],
                        internalType: 'struct NftTransferDetails',
                        name: 'transferDetails',
                        type: 'tuple',
                    },
                    {
                        internalType: 'string[]',
                        name: 'signatures',
                        type: 'string[]',
                    },
                ],
                internalType: 'struct NftTransferWithSignatures',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'chain',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'txHash',
                type: 'string',
            },
        ],
        name: 'getLockNftSignaturesCount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'stakerAddress',
                type: 'address',
            },
        ],
        name: 'getStakingSignatures',
        outputs: [
            {
                internalType: 'string[]',
                name: '',
                type: 'string[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'stakerAddress',
                type: 'address',
            },
        ],
        name: 'getStakingSignaturesCount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        name: 'lockSignatures',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'string',
                        name: 'sourceChain',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'destinationChain',
                        type: 'string',
                    },
                    {
                        internalType: 'address',
                        name: 'destinationUserAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'sourceNftContractAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'string',
                        name: 'name',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'symbol',
                        type: 'string',
                    },
                    {
                        internalType: 'uint256',
                        name: 'royalty',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'royaltyReceiver',
                        type: 'address',
                    },
                    {
                        internalType: 'string',
                        name: 'metadata',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'transactionHash',
                        type: 'string',
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'string',
                        name: 'nftType',
                        type: 'string',
                    },
                    {
                        internalType: 'uint256',
                        name: 'fee',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct NftTransferDetails',
                name: 'transferDetails',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'stakingSignatures',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        name: 'usedSignatures',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'validatorCount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'validatorEpoch',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'validatorStatusChangeVotes',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'validatorVoted',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'validators',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];

export default bridgeStorageABI;
