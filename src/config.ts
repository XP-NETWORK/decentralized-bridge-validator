import type {
  IBridgeConfig,
  IEvmChainConfig,
  IStakingConfig,
  TChain,
} from "./types";

export const bridgeTestChains = [
  {
    chain: "BSC",
    rpcURL: "https://bsc-testnet.publicnode.com",
    nativeCoinSymbol: "BNB",
    intialFund: "50000000000000000",
    contractAddress: "0xCa5c7090Fa1F3C0939E226ec827Ae140494d81F4",
    chainType: "evm",
    lastBlock: 39520821,
    decimals: 18,
    blockChunks: 1000,
  },
  {
    chain: "ETH",
    rpcURL: "https://ethereum-sepolia.publicnode.com",
    nativeCoinSymbol: "ETH",
    intialFund: "50000000000000000",
    contractAddress: "0xCa3563d84f0D62344B8467382623d780Bb58871f",
    chainType: "evm",
    lastBlock: 5711067,
    decimals: 18,
    blockChunks: 1000,
  },
  {
    chain: "MATIC",
    rpcURL: "https://polygon-amoy-bor-rpc.publicnode.com",
    nativeCoinSymbol: "MATIC",
    intialFund: "50000000000000000",
    contractAddress: "0x820c0b504fe85b43E3c43D2EA24cb764ad78d52e",
    chainType: "evm",
    lastBlock: 47259261,
    decimals: 18,
    blockChunks: 1000,
  },
  {
    chain: "MULTIVERSX",
    nativeCoinSymbol: "EGLD",
    intialFund: "50000000000000000",
    contractAddress:
      "erd1qqqqqqqqqqqqqpgqtsw8s3evjjyqqa2j2tfn9yvufqskdv236n9s2a06h9",
    chainType: "multiversX",
    elasticSearchURL: "https://devnet-index.multiversx.com",
    gatewayURL: "https://devnet-gateway.multiversx.com",
    lastBlock: 2875313,
    chainID: "D",
    decimals: 18,
  },
  {
    chain: "TON",
    rpcURL: "https://testnet.toncenter.com/api/v2/jsonRPC",
    nativeCoinSymbol: "TON",
    intialFund: "500000000",
    contractAddress: "EQDI6P9gheuWLh1euThjFE2muUpa9tp2y49TD6Zz5oOF5gWL",
    chainType: "ton",
    lastBlock: 16810573000003,
    decimals: 9,
  },
  {
    chain: "SECRET",
    rpcURL: "https://lcd.pulsar-3.secretsaturn.net",
    nativeCoinSymbol: "USCRT",
    intialFund: "50000",
    contractAddress: "secret1uxthnjt74cny9wnwx8czmgrc8taz0r8yfas565",
    chainType: "scrt",
    chainId: "pulsar-3",
    lastBlock: 3223704,
    decimals: 6,
    blockChunks: 1000,
  },
  {
    chain: "TEZOS",
    rpcURL: "https://ghostnet.ecadinfra.com",
    restApiURL: "https://api.ghostnet.tzkt.io",
    contractAddress: "KT18pSSB3f9H3xtHzBfMCjTdPja82nqpAm66",
    intialFund: "50000",
    lastBlock: 5240862,
    nativeCoinSymbol: "XTZ",
    chainType: "tezos",
    decimals: 6,
    blockChunks: 1000,
  },
  {
    chain: "HEDERA",
    rpcURL: "https://testnet.hashio.io/api",
    nativeCoinSymbol: "HBAR",
    intialFund: "50000000000000000",
    contractAddress: "0xb3cE27eDadFE006f9f47C5ed5b62E63DFd9Cf3bD",
    chainType: "hedera",
    lastBlock: 7095475,
    royaltyInfoProxyAddress: "0x870f7b68c0a64733dcF4D95E5C06aa34387B98BF",
    decimals: 18,
  },
  {
    chainType: "cosmwasm",
    blockChunks: 100000,
    chain: "TERRA",
    chainId: "pisco-1",
    contractAddress:
      "terra1pscwnx4dch2pmdkda89mdnl5n576hnccrjw4dlssfq5nhgrr850scz0q64",
    decimals: 6,
    intialFund: "100000",
    lastBlock: 10399767,
    nativeCoinSymbol: "uluna",
    rpcURL: "https://terra-testnet-rpc.polkachu.com/",
    walletPrefix: "terra",
  },
] as const satisfies TChain[];

export const storageTestnetConfig: IEvmChainConfig = {
  chain: "OP",
  rpcURL: "https://optimism-sepolia.blockpi.network/v1/rpc/public",
  nativeCoinSymbol: "OP",
  intialFund: "100000000000000000",
  contractAddress: "0x8411EeadD374bDE549F61a166FFBeFca592bC60a",
  chainType: "evm",
  lastBlock: 17608314,
  decimals: 18,
  blockChunks: 1000,
};

export const stakingTestChain: IStakingConfig = {
  chain: "BSC",
  rpcURL: "https://bsc-testnet.publicnode.com",
  coinSymbol: "ERC",
  nativeCoinSymbol: "BNB",
  chainType: "evm",
  coinAddress: "0x9739a54004300e74532c1147b82791193d82B093",
  contractAddress: "0x6e372D7fe53F4B7Baa3543Deffe6B87833846D37",
  intialFund: "100000000000000000",
  lastBlock: 38733903,
  decimals: 18,
  blockChunks: 1000,
};

export const testnetBridgeConfig: IBridgeConfig = {
  bridgeChains: bridgeTestChains,
  storageConfig: storageTestnetConfig,
  stakingConfig: stakingTestChain,
};

export const prodBridgeConfig: IBridgeConfig = {
  bridgeChains: [],
  storageConfig: {
    chain: "OP",
    rpcURL: "https://mainnet.optimism.io",
    nativeCoinSymbol: "OP",
    intialFund: "500000000000000000",
    contractAddress: "0xBridgeStorageAddress",
    chainType: "evm",
    lastBlock: 21321,
    decimals: 18,
    blockChunks: 1000,
  },
  stakingConfig: {
    chain: "BSC",
    rpcURL: "https://bsc-testnet.publicnode.com",
    coinSymbol: "XPNET",
    nativeCoinSymbol: "BNB",
    chainType: "evm",
    coinAddress: "0x61f00f09bA58F1613b05aE4f9AF9039fd8F959d0",
    contractAddress: "0x5a38d6534214ec8Ce0598c37773738F4F7E9FC66",
    intialFund: "100000000000000000000",
    lastBlock: 34255418,
    decimals: 18,
    blockChunks: 1000,
  },
};

export type TSupportedChainsConfig = (typeof bridgeTestChains)[number];
export type TSupportedChains = TSupportedChainsConfig["chain"];
export type TSupportedChainTypes = TSupportedChainsConfig["chainType"];
