import { IBridgeConfig } from '@src/types';

const mockBridgeConfig: IBridgeConfig = {
    storageConfig: {
        chain: 'storageChainMock',
        rpcURL: 'rpcURLMock',
        nativeCoinSymbol: 'nativeCoinSymbolMock',
        intialFund: 'intialFundMock',
        contractAddress: 'contractAddressMock',
        lastBlock: 3214,
        signType: 'ecdsa',
    },
    bridgeChains: [
        {
            chain: 'BSC',
            rpcURL: 'rpcURLMock',
            nativeCoinSymbol: 'nativeCoinSymbolMock',
            intialFund: 'intialFundMock ETH',
            contractAddress: 'contractAddressMock',
            lastBlock: 12345,
            signType: 'ecdsa',
        },
        {
            chain: 'ETH',
            rpcURL: 'rpcURLMock',
            nativeCoinSymbol: 'nativeCoinSymbolMock',
            intialFund: 'intialFundMock',
            contractAddress: 'contractAddressMock',
            lastBlock: 54321,
            signType: 'ecdsa',
        },
        {
            chain: 'nonEvmChainMock',
            rpcURL: 'rpcURLMock',
            nativeCoinSymbol: 'nativeCoinSymbolMock',
            intialFund: 'intialFundMock',
            contractAddress: 'contractAddressMock',
            lastBlock: 54321,
            signType: 'non-evm',
        },
    ],
    stakingConfig: {
        chain: 'stakingChainMock',
        rpcURL: 'rpcURLMock',
        nativeCoinSymbol: 'nativeCoinSymbolMock',
        intialFund: 'intialFundMock',
        contractAddress: 'contractAddressMock',
        lastBlock: 12345,
        coinAddress: "coinAddressMock",
        coinSymbol: "coinSymbolMock",
        signType: 'ecdsa',
    }
};

const mockWallets = {
    evmWallet: {
        address: '0x1234567890abcdef1234567890abcdef12345678',
        privateKey:
            '0x8a6a4e9e3865814dc8f1e4fca103051162921715d1e517ba638ba05656f320b0',
    },
    multiversXWallet: {
        userWallet: {
            version: 4,
            kind: 'secretKey',
            id: '514a0fac-3d69-44fb-9d4c-c822ac9b3692',
            address: 'f850cf31dc1691296821a965f0fe112c2609ab007462e9872b4257180a3af5d6',
            bech32: 'erd1lpgv7vwuz6gjj6pp49jlpls39snqn2cqw33wnpetgft3sz367htqmn7t6u',
            crypto: {
                ciphertext: '02194e4c5ffe39b2777465af3f78a833853e7c25d539d6f188e44a0cad20706e48cf9430742cbf6275025782b8992d47bc0de4f36a293a785c446896321992e6',
                cipherparams: { iv: '585d831cbf38cdc9cce3d7f9e27f6f88' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: 'd8e67d45f1ce93d7be36ea98c3a76c3c1db03ddace83fb485ef8fde5c6e69d7c',
                    n: 4096,
                    r: 8,
                    p: 1
                },
                mac: '598199f3ac575a2ec015bbe50185ad4bb2df7c57aba85086e1063f1d6e066a2e'
            }
        },
        password: 'ghsjyd1exnu'
    }
};
export { mockBridgeConfig, mockWallets }