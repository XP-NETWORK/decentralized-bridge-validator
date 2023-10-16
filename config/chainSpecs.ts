/*
    Test network for bridge
*/
const optimismTestChain = {
    chain: "OP",
    rpc: "https://api.zan.top/node/v1/opt/goerli/public"
}

const bridgeTestChains = [
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
const optimismProdChain = {
    chain: "OP",
    rpc: "https://mainnet.optimism.io"
}

const bridgeProdChains = [
    {
        chain: "BSC",
        rpc: "https://bsc-dataseed1.binance.org/",
    },
    {
        chain: "ETH",
        rpc: "https://eth.llamarpc.com",
    }
]


const testnet = {
    bridgeChains: bridgeTestChains,
    optimismChain: optimismTestChain
}

const prod = {
    bridgeChains: bridgeProdChains,
    optimismChain: optimismProdChain
}