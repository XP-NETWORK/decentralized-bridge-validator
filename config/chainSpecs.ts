import { IChain, IChainSpecs, IStakingConfig } from "./types"

/*
    Test network for bridge
*/
const optimismTestChain: IChain = {
    chain: "OP",
    rpc: "https://optimism-goerli.publicnode.com",
    nativeCoinSymbol: "OP",
    intialFund: "100000000000000000",
    contractAddress: "0x820Bc5a22bAB7987889fBF8384e64EA06BfcbD9c",
    chainType: 'evm',
    lastBlock: 1231
}


const bridgeTestChains: IChain[] = [
    {
        chain: "BSC",
        rpc: "https://bsc-testnet.publicnode.com",
        nativeCoinSymbol: "BNB",
        intialFund: "500000000000000000",
        contractAddress: "0xBridgeContractAddress",
        chainType: 'evm',
        lastBlock: 1231
    },
    {
        chain: "ETH",
        rpc: "https://rpc.ankr.com/eth_goerli",
        nativeCoinSymbol: "ETH",
        intialFund: "100000000000000000",
        contractAddress: "0xBridgeContractAddress",
        chainType: 'evm',
        lastBlock: 1231
    }
]

const stakingTestChain: IStakingConfig = {
    chain: "BSC",
    rpc: "https://bsc-testnet.publicnode.com",
    coinSymbol: "XPNET",
    nativeCoinSymbol: "BNB",
    chainType: 'evm',
    coinAddress: "0x61f00f09bA58F1613b05aE4f9AF9039fd8F959d0",
    contractAddress: "0x5a38d6534214ec8Ce0598c37773738F4F7E9FC66",
    intialFund: "100000000000000000000",
    lastBlock: 34305190
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
        contractAddress: "0xBridgeContractAddress",
        chainType: 'evm',
        lastBlock: 21321
    },
    {
        chain: "ETH",
        rpc: "https://eth.llamarpc.com",
        nativeCoinSymbol: "ETH",
        intialFund: "500000000000000000",
        contractAddress: "0xBridgeContractAddress",
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