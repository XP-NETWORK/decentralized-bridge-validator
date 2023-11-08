import { IBridgeConfig, IEvmChainConfig, IMultiversXChainConfig, IStakingConfig } from "@src/types"

/*
    Test network for bridge
*/
const storageTestnetConfig: IEvmChainConfig = {
    chain: "OP",
    rpcURL: "https://optimism-goerli.publicnode.com",
    nativeCoinSymbol: "OP",
    intialFund: "100000000000000000",
    contractAddress: "0x05f625377A7800366fc39b9992F4e58747723FB8",
    chainType: 'evm',
    lastBlock: 17007099
}


const bridgeTestChains: (IMultiversXChainConfig | IEvmChainConfig)[] = [
    {
        chain: "BSC",
        rpcURL: "https://data-seed-prebsc-1-s2.bnbchain.org:8545",
        nativeCoinSymbol: "BNB",
        intialFund: "50000000000000000",
        contractAddress: "0x02f9b3cC780D0e82086940ec6cb65dDfAA12666e",
        chainType: 'evm',
        lastBlock: 34890455
    },
    {
        chain: "ETH",
        rpcURL: "https://ultra-light-patina.ethereum-sepolia.discover.quiknode.pro/6f98178f32c668af8ee4bb1cc4b8b9308e29367b/",
        nativeCoinSymbol: "ETH",
        intialFund: "50000000000000000",
        contractAddress: "0x3a42753657f0F493082Ae67D980a087c47f5A174",
        chainType: 'evm',
        lastBlock: 4652716
    },
    {
        chain: "MATIC",
        rpcURL: "https://aged-purple-paper.matic-testnet.quiknode.pro/68392cf29ff997951ee6b071f423791c4132cb66/",
        nativeCoinSymbol: "MATIC",
        intialFund: "50000000000000000",
        contractAddress: "0xF599C9De353a2381A96DEC02b9e942cDC7aF2eb3",
        chainType: 'evm',
        lastBlock: 42116275
    },
    {
        chain: "MULTIVERSX",
        nativeCoinSymbol: "EGLD",
        intialFund: "50000000000000000",
        contractAddress: "erd1qqqqqqqqqqqqqpgqft5y7hjtpszey6juqmt7gg9d9fejlaml6n9s8e33vn",
        chainType: 'multiversX',
        elasticSearchURL: "https://devnet-index.multiversx.com",
        gatewayURL: "https://devnet-gateway.multiversx.com",
        lastBlock: 0,
        chainID: "D"
    }
]

const stakingTestChain: IStakingConfig = {
    chain: "BSC",
    rpcURL: "https://responsive-silent-water.bsc-testnet.quiknode.pro/e374f23ac76c16f69a70b6c99837f0eb2ea112e1/",
    coinSymbol: "ERC",
    nativeCoinSymbol: "BNB",
    chainType: 'evm',
    coinAddress: "0x303C8FB57b86F70996E7988Cd3832EA717aD4E7C",
    contractAddress: "0x65362860149e4DebA10b3341B9F86C53143a7a2C",
    intialFund: "100000000000000000000",
    lastBlock: 34890565
}


const testnetBridgeConfig: IBridgeConfig = {
    bridgeChains: bridgeTestChains,
    storageConfig: storageTestnetConfig,
    stakingConfig: stakingTestChain
}

/*
    Prod network for bridge
*/
const storageProdConfig: IEvmChainConfig = {
    chain: "OP",
    rpcURL: "https://mainnet.optimism.io",
    nativeCoinSymbol: "OP",
    intialFund: "500000000000000000",
    contractAddress: "0xBridgeStorageAddress",
    chainType: 'evm',
    lastBlock: 21321
}

const bridgeProdChains: (IMultiversXChainConfig | IEvmChainConfig)[] = [
    {
        chain: "BSC",
        rpcURL: "https://bsc-dataseed1.binance.org/",
        nativeCoinSymbol: "BNB",
        intialFund: "500000000000000000",
        contractAddress: "0x0471fcD1De1fCB7C9f426630c8D1579fb3496c87",
        chainType: 'evm',
        lastBlock: 34404611
    },
    {
        chain: "ETH",
        rpcURL: "https://ethereum-sepolia.publicnode.com",
        nativeCoinSymbol: "ETH",
        intialFund: "500000000000000000",
        contractAddress: "0xBE65Ba9DC7DE80e5B80f7d93a14450E2Ad25a16B",
        chainType: 'evm',
        lastBlock: 21321
    }
]
const stakingProdChain: IStakingConfig = {
    chain: "BSC",
    rpcURL: "https://bsc-testnet.publicnode.com",
    coinSymbol: "XPNET",
    nativeCoinSymbol: "BNB",
    chainType: 'evm',
    coinAddress: "0x61f00f09bA58F1613b05aE4f9AF9039fd8F959d0",
    contractAddress: "0x5a38d6534214ec8Ce0598c37773738F4F7E9FC66",
    intialFund: "100000000000000000000",
    lastBlock: 34255418
}


const prodBridgeConfig: IBridgeConfig = {
    bridgeChains: bridgeProdChains,
    storageConfig: storageProdConfig,
    stakingConfig: stakingProdChain
}

const BLOCK_CHUNKS = 1000;

export { BLOCK_CHUNKS, testnetBridgeConfig, prodBridgeConfig }