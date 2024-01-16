const stakingABI = [
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_stakingAmount',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '_ERC20Token',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'validatorAddress',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'chainType',
                        type: 'string',
                    },
                ],
                indexed: false,
                internalType: 'struct ValidatorAddressAndChainType[]',
                name: 'validatorAddressAndChainType',
                type: 'tuple[]',
            },
        ],
        name: 'Staked',
        type: 'event',
    },
    {
        inputs: [],
        name: 'ERC20Token',
        outputs: [
            {
                internalType: 'contract IERC20',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'validatorAddress',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'chainType',
                        type: 'string',
                    },
                ],
                internalType: 'struct ValidatorAddressAndChainType[]',
                name: '_validatorAddressAndChainType',
                type: 'tuple[]',
            },
        ],
        name: 'stakeERC20',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'stakingAmount',
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
        name: 'stakingBalances',
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
];

export default stakingABI;
