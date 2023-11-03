import { IBridgeConfig, IChainConfig, IEvmChainConfig, IStakingConfig } from "@src/types"

/*
    Test network for bridge
*/
const storageTestnetConfig: IEvmChainConfig = {
    chain: "OP",
    rpcURL: "https://optimism-goerli.publicnode.com",
    nativeCoinSymbol: "OP",
    intialFund: "100000000000000000",
    contractAddress: "0x5bB1EdcACf79F59Dfa9d0e054847B33eb20d2AA4",
    chainType: 'evm',
    lastBlock: 16237329
}


const bridgeTestChains: (IChainConfig | IEvmChainConfig)[] = [
    {
        chain: "BSC",
        rpcURL: "https://responsive-silent-water.bsc-testnet.quiknode.pro/e374f23ac76c16f69a70b6c99837f0eb2ea112e1/",
        nativeCoinSymbol: "BNB",
        intialFund: "50000000000000000",
        contractAddress: "0x661b12aC3648642bad0843C3A88B519cF310CFf2",
        chainType: 'evm',
        lastBlock: 34650296
    },
    {
        chain: "ETH",
        rpcURL: "https://ethereum-sepolia.publicnode.com",
        nativeCoinSymbol: "ETH",
        intialFund: "50000000000000000",
        contractAddress: "0x7935f469298002c0Fb11F853B415B08aDCaC9Cf7",
        chainType: 'evm',
        lastBlock: 4592411
    },
    {
        chain: "MATIC",
        rpcURL: "https://rpc-mumbai.maticvigil.com/",
        nativeCoinSymbol: "MATIC",
        intialFund: "50000000000000000",
        contractAddress: "0xe8A305aa7cf2Fed6fe27436529E7cF0bBEf1e61E",
        chainType: 'evm',
        lastBlock: 41817080
    },
    {
        chain: "MULTIVERSX",
        rpcURL: "https://rpc-mumbai.maticvigil.com/",
        nativeCoinSymbol: "MATIC",
        intialFund: "50000000000000000",
        contractAddress: "0xe8A305aa7cf2Fed6fe27436529E7cF0bBEf1e61E",
        chainType: 'evm',
        lastBlock: 41817080
    }
]

const stakingTestChain: IStakingConfig = {
    chain: "BSC",
    rpcURL: "https://responsive-silent-water.bsc-testnet.quiknode.pro/e374f23ac76c16f69a70b6c99837f0eb2ea112e1/",
    coinSymbol: "ERC",
    nativeCoinSymbol: "BNB",
    chainType: 'evm',
    coinAddress: "0x303C8FB57b86F70996E7988Cd3832EA717aD4E7C",
    contractAddress: "0x6f2C150f6D11B813d9175ebE3A3212f7BBB89E65",
    intialFund: "100000000000000000000",
    lastBlock: 34650357
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

const bridgeProdChains: (IChainConfig | IEvmChainConfig)[] = [
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