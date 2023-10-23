import { IChain, IChainSpecs, IStakingConfig } from "./types"

/*
    Test network for bridge
*/
const optimismTestChain: IChain = {
    chain: "OP",
    rpc: "https://optimism-goerli.publicnode.com",
    nativeCoinSymbol: "OP",
    intialFund: "100000000000000000",
    contractAddress: "0x61f00f09bA58F1613b05aE4f9AF9039fd8F959d0",
    chainType: 'evm',
    lastBlock: 16237329
}


const bridgeTestChains: IChain[] = [
    {
        chain: "BSC",
        rpc: "https://responsive-silent-water.bsc-testnet.quiknode.pro/e374f23ac76c16f69a70b6c99837f0eb2ea112e1/",
        nativeCoinSymbol: "BNB",
        intialFund: "100000000000000000",
        contractAddress: "0x6daa97BC61aa0B9731fc9249EaB7Dd439Af2e4f3",
        chainType: 'evm',
        lastBlock: 	34410865
    },
    {
        chain: "ETH",
        rpc: "https://ethereum-sepolia.publicnode.com",
        nativeCoinSymbol: "ETH",
        intialFund: "100000000000000000",
        contractAddress: "0x5aB1Fbd625CC8E343d08B0cDAc9EE88e7f8f9022",
        chainType: 'evm',
        lastBlock: 4539493
    }
]

const stakingTestChain: IStakingConfig = {
    chain: "BSC",
    rpc: "https://responsive-silent-water.bsc-testnet.quiknode.pro/e374f23ac76c16f69a70b6c99837f0eb2ea112e1/",
    coinSymbol: "ERC",
    nativeCoinSymbol: "BNB",
    chainType: 'evm',
    coinAddress: "0xbcae1e781EF02995cf169c4918e929eB98B2d94A",
    contractAddress: "0xd0eB9e45cD5477353027f876105bd88e55F0A422",
    intialFund: "100000000000000000000",
    lastBlock: 34401766
}


const testnetChainSpecs: IChainSpecs = {
    bridgeChains: bridgeTestChains,
    optimismChain: optimismTestChain,
    stakingConfig: stakingTestChain
}

/*
    Prod network for bridge
*/
const optimismProdChain: IChain = {
    chain: "OP",
    rpc: "https://mainnet.optimism.io",
    nativeCoinSymbol: "OP",
    intialFund: "500000000000000000",
    contractAddress: "0xBridgeStorageAddress",
    chainType: 'evm',
    lastBlock: 21321
}

const bridgeProdChains: IChain[] = [
    {
        chain: "BSC",
        rpc: "https://bsc-dataseed1.binance.org/",
        nativeCoinSymbol: "BNB",
        intialFund: "500000000000000000",
        contractAddress: "0x0471fcD1De1fCB7C9f426630c8D1579fb3496c87",
        chainType: 'evm',
        lastBlock: 34404611
    },
    {
        chain: "ETH",
        rpc: "https://ethereum-sepolia.publicnode.com",
        nativeCoinSymbol: "ETH",
        intialFund: "500000000000000000",
        contractAddress: "0xBE65Ba9DC7DE80e5B80f7d93a14450E2Ad25a16B",
        chainType: 'evm',
        lastBlock: 21321
    }
]
const stakingProdChain: IStakingConfig = {
    chain: "BSC",
    rpc: "https://bsc-testnet.publicnode.com",
    coinSymbol: "XPNET",
    nativeCoinSymbol: "BNB",
    chainType: 'evm',
    coinAddress: "0x61f00f09bA58F1613b05aE4f9AF9039fd8F959d0",
    contractAddress: "0x5a38d6534214ec8Ce0598c37773738F4F7E9FC66",
    intialFund: "100000000000000000000",
    lastBlock: 34255418
}


const prodChainSpecs: IChainSpecs = {
    bridgeChains: bridgeProdChains,
    optimismChain: optimismProdChain,
    stakingConfig: stakingProdChain
}

const BLOCK_CHUNKS = 1000;

export { BLOCK_CHUNKS, testnetChainSpecs, prodChainSpecs }