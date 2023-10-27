import { IBridgeConfig } from '@src/types';

const mockBridgeConfig: IBridgeConfig = {
    storageConfig: {
        chain: 'storageChainMock',
        rpcURL: 'rpcURLMock',
        nativeCoinSymbol: 'nativeCoinSymbolMock',
        intialFund: 'intialFundMock',
        contractAddress: 'contractAddressMock',
        lastBlock: 3214,
        chainType: 'evm',
    },
    bridgeChains: [
        {
            chain: 'BSC',
            rpcURL: 'rpcURLMock',
            nativeCoinSymbol: 'nativeCoinSymbolMock',
            intialFund: 'intialFundMock ETH',
            contractAddress: 'contractAddressMock',
            lastBlock: 12345,
            chainType: 'evm',
        },
        {
            chain: 'ETH',
            rpcURL: 'rpcURLMock',
            nativeCoinSymbol: 'nativeCoinSymbolMock',
            intialFund: 'intialFundMock',
            contractAddress: 'contractAddressMock',
            lastBlock: 54321,
            chainType: 'evm',
        },
        {
            chain: 'nonEvmChainMock',
            rpcURL: 'rpcURLMock',
            nativeCoinSymbol: 'nativeCoinSymbolMock',
            intialFund: 'intialFundMock',
            contractAddress: 'contractAddressMock',
            lastBlock: 54321,
            chainType: 'non-evm',
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
        chainType: 'evm',
    }
};

const mockWallets = {
    evmWallet: {
        address: '0x1234567890abcdef1234567890abcdef12345678',
        privateKey:
            '0x8a6a4e9e3865814dc8f1e4fca103051162921715d1e517ba638ba05656f320b0',
    },
};
export { mockBridgeConfig, mockWallets }