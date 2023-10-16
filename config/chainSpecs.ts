import { chain } from "./types"

/*
    Test network for bridge
*/
const optimismTestChain: chain = {
    chain: "OP",
    rpc: "https://api.zan.top/node/v1/opt/goerli/public"
}

const bridgeTestChains: chain[] = [
    {
        chain: "BSC",
        rpc: "https://api.zan.top/node/v1/bsc/testnet/public",
    },
    {
        chain: "ETH",
        rpc: "https://rpc.ankr.com/eth_goerli",
    }
]

/*
    Prod network for bridge
*/
const optimismProdChain: chain = {
    chain: "OP",
    rpc: "https://mainnet.optimism.io"
}

const bridgeProdChains: chain[] = [
    {
        chain: "BSC",
        rpc: "https://bsc-dataseed1.binance.org/",
    },
    {
        chain: "ETH",
        rpc: "https://eth.llamarpc.com",
    }
]


const testnetChainSpecs = {
    bridgeChains: bridgeTestChains,
    optimismChain: optimismTestChain
}

const prodChainSpecs = {
    bridgeChains: bridgeProdChains,
    optimismChain: optimismProdChain
}

export { testnetChainSpecs, prodChainSpecs }