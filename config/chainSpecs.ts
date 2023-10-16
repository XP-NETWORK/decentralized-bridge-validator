import { chain, chainSpecs, stakingConfig } from "./types"

/*
    Test network for bridge
*/
const optimismTestChain: chain = {
    chain: "OP",
    rpc: "https://api.zan.top/node/v1/opt/goerli/public",
    nativeCoinSymbol: "OP",
    intialFund: BigInt("5000000000000000")
}


const bridgeTestChains: chain[] = [
    {
        chain: "BSC",
        rpc: "https://api.zan.top/node/v1/bsc/testnet/public",
        nativeCoinSymbol: "BNB",
        intialFund: BigInt("20000000000000000")
    },
    {
        chain: "ETH",
        rpc: "https://rpc.ankr.com/eth_goerli",
        nativeCoinSymbol: "ETH",
        intialFund: BigInt("30000000000000000")
    }
]

const stakingTestChain: stakingConfig = {
    chain: "BSC",
    rpc: "https://api.zan.top/node/v1/bsc/testnet/public",
    coinSymbol: "XPNET",
    coinAddress: "0x61f00f09bA58F1613b05aE4f9AF9039fd8F959d0",
    contractAddress: "0xe8A305aa7cf2Fed6fe27436529E7cF0bBEf1e61E",
    intialFund: BigInt("5000000000000000")
}


const testnetChainSpecs: chainSpecs = {
    bridgeChains: bridgeTestChains,
    optimismChain: optimismTestChain,
    stakingConfig: stakingTestChain
}

/*
    Prod network for bridge
*/
const optimismProdChain: chain = {
    chain: "OP",
    rpc: "https://mainnet.optimism.io",
    nativeCoinSymbol: "OP",
    intialFund: BigInt("500000000000000000")
}

const bridgeProdChains: chain[] = [
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
const stakingProdChain: stakingConfig = {
    chain: "OP",
    rpc: "https://api.zan.top/node/v1/opt/goerli/public",
    coinSymbol: "OP",
    coinAddress: "0xProdCoinAddress",
    contractAddress: "0xProdContractAddress",
    intialFund: BigInt("500000000000000000")
}


const prodChainSpecs: chainSpecs = {
    bridgeChains: bridgeProdChains,
    optimismChain: optimismProdChain,
    stakingConfig: stakingProdChain
}

export { testnetChainSpecs, prodChainSpecs }