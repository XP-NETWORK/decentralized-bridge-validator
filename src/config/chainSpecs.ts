import { IBridgeConfig, IEvmChainConfig, IStakingConfig, TChain } from "@src/types"

/*
    Test network for bridge
*/
const storageTestnetConfig: IEvmChainConfig = {
    chain: "OP",
    rpcURL: "https://optimism-goerli.publicnode.com",
    nativeCoinSymbol: "OP",
    intialFund: "100000000000000000",
    contractAddress: "0xaeD15b9AEd9401658A177abaab5854f31973F5C8",
    chainType: 'evm',
    lastBlock: 17608314
}


const bridgeTestChains: TChain[] = [
    {
        chain: "BSC",
        rpcURL: "https://bsc-testnet.publicnode.com",
        nativeCoinSymbol: "BNB",
        intialFund: "50000000000000000",
        contractAddress: "0x3EC2839EcEAfa2Ce9e419718364B070563Db516e",
        chainType: 'evm',
        lastBlock: 36623578
    },
    {
        chain: "ETH",
        rpcURL: "https://rpc.notadegen.com/eth/sepolia",
        nativeCoinSymbol: "ETH",
        intialFund: "50000000000000000",
        contractAddress: "0xA0C15702892491597D369A04d7366Af234cF5F73",
        chainType: 'evm',
        lastBlock: 4871981
    },
    {
        chain: "MATIC",
        rpcURL: "https://polygon-mumbai-bor.publicnode.com",
        nativeCoinSymbol: "MATIC",
        intialFund: "50000000000000000",
        contractAddress: "0x1f89dce7eBFb78D6CA0A4d16F9B6a9F61B186ebc",
        chainType: 'evm',
        lastBlock: 44422223
    },
    // {
    //     chain: "MULTIVERSX",
    //     nativeCoinSymbol: "EGLD",
    //     intialFund: "50000000000000000",
    //     contractAddress: "erd1qqqqqqqqqqqqqpgqtsw8s3evjjyqqa2j2tfn9yvufqskdv236n9s2a06h9",
    //     chainType: 'multiversX',
    //     elasticSearchURL: "https://devnet-index.multiversx.com",
    //     gatewayURL: "https://devnet-gateway.multiversx.com",
    //     lastBlock: 0,
    //     chainID: "D"
    // },
    // {
    //     chain: "TON",
    //     rpcURL: "https://testnet.toncenter.com/api/v2/jsonRPC",
    //     nativeCoinSymbol: "TON",
    //     intialFund: "500000000",
    //     contractAddress: "EQDI6P9gheuWLh1euThjFE2muUpa9tp2y49TD6Zz5oOF5gWL",
    //     chainType: 'ton',
    //     lastBlock: 16810573000003
    // },
    // {
    //     chain: "SECRET",
    //     rpcURL: "https://pulsar.api.trivium.network:1317",
    //     nativeCoinSymbol: "USCRT",
    //     intialFund: "50000",
    //     contractAddress: "secret1jcfm9ct9jdy9uugcnfnjzpv4eydaj620kuvulp",
    //     chainType: 'scrt',
    //     chainId: 'pulsar-3',
    //     lastBlock: 50883
    // },
    {
        chain: "TEZOS",
        rpcURL: "https://ghostnet.ecadinfra.com",
        restApiURL: "https://api.ghostnet.tzkt.io",
        contractAddress: "KT1NHxTSXAFKH2y94PpfqDsg4bZ5SiF2V8a4",
        intialFund: "50000",
        lastBlock: 5058309,
        nativeCoinSymbol: "XTZ",
        chainType: "tezos"
    },
    {
        chain: "MATIC",
        rpcURL: "https://polygon-mumbai-bor.publicnode.com",
        nativeCoinSymbol: "MATIC",
        intialFund: "50000000000000000",
        contractAddress: "0x1f89dce7eBFb78D6CA0A4d16F9B6a9F61B186ebc",
        chainType: 'hedera',
        lastBlock: 44422223
    },
]

const stakingTestChain: IStakingConfig = {
    chain: "BSC",
    rpcURL: "https://bsc-testnet.publicnode.com",
    coinSymbol: "ERC",
    nativeCoinSymbol: "BNB",
    chainType: 'evm',
    coinAddress: "0x9739a54004300e74532c1147b82791193d82B093",
    contractAddress: "0x6e372D7fe53F4B7Baa3543Deffe6B87833846D37",
    intialFund: "100000000000000000000",
    lastBlock: 35889818
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

const bridgeProdChains: TChain[] = [
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