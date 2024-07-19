import type {
  IBridgeConfig,
  IEvmChainConfig,
  IStakingConfig,
  TChain,
} from "./types";

export const bridgeTestChains = [
  {
    chain: "BSC",
    rpcURL: "https://bsc-testnet-rpc.publicnode.com",
    nativeCoinSymbol: "BNB",
    intialFund: "50000000000000000",
    contractAddress: "0xfdEd3B266B870a4F0f3A0A45e50741a02f4dba15",
    chainType: "evm",
    lastBlock: 42202242,
    decimals: 18,
    blockChunks: 1000,
  },
  {
    chain: "MATIC",
    rpcURL: "https://polygon-amoy.blockpi.network/v1/rpc/public",
    nativeCoinSymbol: "MATIC",
    intialFund: "50000000000000000",
    contractAddress: "0x676Bb24dA610fb55A1FB0252B49Ad478D38c2C69",
    chainType: "evm",
    lastBlock: 9674956,
    decimals: 18,
    blockChunks: 1000,
  },

  {
    chain: "HEDERA",
    rpcURL: "https://testnet.hashio.io/api",
    nativeCoinSymbol: "HBAR",
    intialFund: "10000000000000000000",
    contractAddress: "0x3C8A843c6c56f5cB0946054b3406ED0899EF7cec",
    chainType: "hedera",
    lastBlock: 6711430,
    royaltyInfoProxyAddress: "0x95A1b480590B0D66f84FC8D92e0dABB17FEc7072",
    decimals: 18,
    blockChunks: 1000,
  },
] as const satisfies TChain[];

export const storageTestnetConfig: IEvmChainConfig = {
  chain: "BSC",
  rpcURL: "https://bsc-testnet-rpc.publicnode.com",
  nativeCoinSymbol: "BNB",
  intialFund: "0",
  contractAddress: "0xb40efe27C71b5022BCa34D5153B8E0C1ca2cEb2d",
  chainType: "evm",
  lastBlock: 17608314,
  decimals: 18,
  blockChunks: 1000,
};

export const stakingTestChain: IStakingConfig = {
  chain: "BSC",
  rpcURL: "https://bsc-testnet-rpc.publicnode.com",
  coinSymbol: "ERC",
  nativeCoinSymbol: "BNB",
  chainType: "evm",
  coinAddress: "0x959Bec86F0D404f03c520ae9008050980aB096e9",
  contractAddress: "0xD9bF6a89Dc7A28ebeF1c7636398D9e4AEc20627a",
  intialFund: "1000000000000000",
  lastBlock: 42202737,
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
    rpcURL: "https://bsc-testnet-rpc.publicnode.com",
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
