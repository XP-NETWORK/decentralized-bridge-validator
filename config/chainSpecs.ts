import { chain, chainSpecs, stakingCoin } from "./types"

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

const stakingTestChain: stakingCoin = {
    chain: "BSC",
    rpc: "https://api.zan.top/node/v1/bsc/testnet/public",
    coinSymbol: "XPNET",
    coinAddress: "0xTestAddress",
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
const stakingProdChain: stakingCoin = {
    chain: "OP",
    rpc: "https://api.zan.top/node/v1/opt/goerli/public",
    coinSymbol: "OP",
    coinAddress: "0xProdCoinAddress",
    intialFund: BigInt("500000000000000000")
}


const prodChainSpecs: chainSpecs = {
    bridgeChains: bridgeProdChains,
    optimismChain: optimismProdChain,
    stakingConfig: stakingProdChain
}

export { testnetChainSpecs, prodChainSpecs }