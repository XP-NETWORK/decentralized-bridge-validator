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
        rpc: "https://bsc-testnet.publicnode.com",
        nativeCoinSymbol: "BNB",
        intialFund: "100000000000000000",
        contractAddress: "0xBridgeContractAddress",
        chainType: 'evm',
        lastBlock: 1231
    },
    {
        chain: "ETH",
        rpc: "wss://ethereum-sepolia.publicnode.com",
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
    coinAddress: "0x60F0Fa700E399Aa2a94F6a621fCecF5D7C4062A5",
    contractAddress: "0x91C6E26aB681458CB87a67bba9D499A1c9b5E86C",
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