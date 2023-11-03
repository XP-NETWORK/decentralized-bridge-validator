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
            nativeCoinSymbol: 'nativeCoinSymbolMock',
            intialFund: 'intialFundMock',
            contractAddress: 'contractAddressMock',
            lastBlock: 54321,
            chainType: 'multiversX',
            elasticSearchURL: "https://devnet-index.multiversx.com",
            gatewayURL: "https://devnet-gateway.multiversx.com",
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
    multiversXWallet: {
        userWallet: {
            version: 4,
            kind: "secretKey",
            id: "139565e9-5d7c-44cc-9d95-adc6ae8372a7",
            address: "f8e2792233ab260d7f1e19290bf8d53070919edf0c1108804d0976884a91b877",
            bech32: "erd1lr38jg3n4vnq6lc7ry5sh7x4xpcfr8klpsgs3qzdp9mgsj53hpmsf3jg65",
            crypto: {
                ciphertext: "9bbbd14512984095242fa13517dd96164143683b29dc5a791b2af4224b315326a7f1dc0a6393e1391866851941517d67bdb4c8f89ef941f2bce9c65f891f3167",
                cipherparams: {
                    iv: "2850cfea9ac07da97b364facadf64251"
                },
                cipher: "aes-128-ctr",
                kdf: "scrypt",
                kdfparams: {
                    dklen: 32,
                    salt: "bf474285cd209b102e23ab115879e52b64dbce9d9d880e80df371c2e5da714a9",
                    n: 4096,
                    r: 8,
                    p: 1
                },
                mac: "e8dd25b15d61a176456f733f5d61c4728d23f633151eea44172bdff3028d68a3"
            }
        },
        password: "ycria4ygubr"
    }
};
export { mockBridgeConfig, mockWallets }