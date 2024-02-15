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
    contractAddress: "0x3EC2839EcEAfa2Ce9e419718364B070563Db516e",
    chainType: "evm",
    lastBlock: 37764283,
  },
  {
    chain: "ETH",
    rpcURL: "https://rpc.notadegen.com/eth/sepolia",
    nativeCoinSymbol: "ETH",
    intialFund: "50000000000000000",
    contractAddress: "0xA0C15702892491597D369A04d7366Af234cF5F73",
    chainType: "evm",
    lastBlock: 5150604,
  },
  {
    chain: "MATIC",
    rpcURL: "https://polygon-mumbai-bor.publicnode.com",
    nativeCoinSymbol: "MATIC",
    intialFund: "50000000000000000",
    contractAddress: "0x1f89dce7eBFb78D6CA0A4d16F9B6a9F61B186ebc",
    chainType: "evm",
    lastBlock: 52122800,
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
    lastBlock: 0,
    chainID: "D",
  },
  {
    chain: "TON",
    rpcURL: "https://testnet.toncenter.com/api/v2/jsonRPC",
    nativeCoinSymbol: "TON",
    intialFund: "500000000",
    contractAddress: "EQDI6P9gheuWLh1euThjFE2muUpa9tp2y49TD6Zz5oOF5gWL",
    chainType: "ton",
    lastBlock: 16810573000003,
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
  },
  {
    chain: "TEZOS",
    rpcURL: "https://ghostnet.ecadinfra.com",
    restApiURL: "https://api.ghostnet.tzkt.io",
    contractAddress: "KT1NHxTSXAFKH2y94PpfqDsg4bZ5SiF2V8a4",
    intialFund: "50000",
    lastBlock: 5240862,
    nativeCoinSymbol: "XTZ",
    chainType: "tezos",
  },
] as const satisfies TChain[];

export const storageTestnetConfig: IEvmChainConfig = {
  chain: "OP",
  rpcURL: "https://optimism-goerli.publicnode.com",
  nativeCoinSymbol: "OP",
  intialFund: "100000000000000000",
  contractAddress: "0xaeD15b9AEd9401658A177abaab5854f31973F5C8",
  chainType: "evm",
  lastBlock: 17608314,
};

export const stakingTestChain: IStakingConfig = {
  chain: "BSC",
  rpcURL: "https://bsc-testnet.publicnode.com",
  coinSymbol: "ERC",
  nativeCoinSymbol: "BNB",
  chainType: "evm",
  coinAddress: "0x9739a54004300e74532c1147b82791193d82B093",
  contractAddress: "0x6e372D7fe53F4B7Baa3543Deffe6B87833846D37",
  intialFund: "100000000000000000000",
  lastBlock: 36698700,
};

export const testnetBridgeConfig: IBridgeConfig = {
  bridgeChains: bridgeTestChains,
  storageConfig: storageTestnetConfig,
  stakingConfig: stakingTestChain,
};

export type TSupportedChainsConfig = (typeof bridgeTestChains)[number];
export type TSupportedChains = TSupportedChainsConfig["chain"];