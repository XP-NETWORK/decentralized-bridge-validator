import { IChain, IChainSpecs, IStakingConfig } from "./types"

/*
    Test network for bridge
*/
const optimismTestChain: IChain = {
    chain: "OP",
    rpc: "https://api.zan.top/node/v1/opt/goerli/public",
    nativeCoinSymbol: "OP",
    intialFund: BigInt("5000000000000000")
}


const bridgeTestChains: IChain[] = [
    {
        chain: "BSC",
        rpc: "https://bsc-testnet.publicnode.com",
        nativeCoinSymbol: "BNB",
        intialFund: BigInt("50000000000000000")
    },
    {
        chain: "ETH",
        rpc: "https://rpc.ankr.com/eth_goerli",
        nativeCoinSymbol: "ETH",
        intialFund: BigInt("1000000000000000")
    }
]

const stakingTestChain: IStakingConfig = {
    chain: "BSC",
    rpc: "https://bsc-testnet.publicnode.com",
    coinSymbol: "XPNET",
    coinAddress: "0x61f00f09bA58F1613b05aE4f9AF9039fd8F959d0",
    contractAddress: "0xe8A305aa7cf2Fed6fe27436529E7cF0bBEf1e61E",
    intialFund: BigInt("1000000000000000000"),
    lastBlock: 34255418
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
    intialFund: BigInt("500000000000000000")
}

const bridgeProdChains: IChain[] = [
    {
        chain: "BSC",
        rpc: "https://bsc-dataseed1.binance.org/",
        nativeCoinSymbol: "BNB",
        intialFund: BigInt("500000000000000000")
    },
    {
        chain: "ETH",
        rpc: "https://eth.llamarpc.com",
        nativeCoinSymbol: "ETH",
        intialFund: BigInt("500000000000000000")
    }
]
const stakingProdChain: IStakingConfig = {
    chain: "OP",
    rpc: "https://api.zan.top/node/v1/opt/goerli/public",
    coinSymbol: "OP",
    coinAddress: "0xProdCoinAddress",
    contractAddress: "0xProdContractAddress",
    intialFund: BigInt("500000000000000000"),
    lastBlock: 34255418
}


const prodChainSpecs: IChainSpecs = {
    bridgeChains: bridgeProdChains,
    optimismChain: optimismProdChain,
    stakingConfig: stakingProdChain
}

const BLOCK_CHUNKS = 1000;

export { BLOCK_CHUNKS, testnetChainSpecs, prodChainSpecs }