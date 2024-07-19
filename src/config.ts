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
  bridgeChains: [
    {
      chain: "BSC",
      rpcURL: "https://bsc-pokt.nodies.app",
      nativeCoinSymbol: "BNB",
      intialFund: "50000000000000000",
      contractAddress: "0xA8802be1Bd39888EBD38b236e2A4fAd4d8e76a1d",
      chainType: "evm",
      lastBlock: 40612390,
      decimals: 18,
      blockChunks: 1000,
    },
    {
      chain: "MATIC",
      rpcURL: "https://polygon-pokt.nodies.app",
      nativeCoinSymbol: "MATIC",
      intialFund: "50000000000000000",
      contractAddress: "0x45681560bBe70E63dDA3bd3e2015dCb4879ba0c9",
      chainType: "evm",
      lastBlock: 59506967,
      decimals: 18,
      blockChunks: 1000,
    },
    {
      chain: "HEDERA",
      rpcURL: "https://mainnet.hashio.io/api",
      nativeCoinSymbol: "HBAR",
      intialFund: "50000000000000000",
      contractAddress: "0xb502540e05cc488a40974fbae9db8450b9b9a5c3",
      chainType: "hedera",
      lastBlock: 66692934,
      royaltyInfoProxyAddress: "0x97fec8ed7203ea3ce58e2a4f44056fd954a35be4",
      decimals: 18,
      blockChunks: 1000,
    },
  ],
  storageConfig: {
    chain: "OP",
    rpcURL: "https://optimism-mainnet.public.blastapi.io",
    nativeCoinSymbol: "OP",
    intialFund: "5000000000000000",
    contractAddress: "0xD23dAaF329d55c673b6Fc749FF557BF3B107b70F",
    chainType: "evm",
    lastBlock: 122850904,
    decimals: 18,
    blockChunks: 1000,
  },
  stakingConfig: {
    chain: "BSC",
    rpcURL: "https://bsc-pokt.nodies.app",
    coinSymbol: "XPNET",
    nativeCoinSymbol: "BNB",
    chainType: "evm",
    coinAddress: "0x8cf8238abf7b933Bf8BB5Ea2C7E4Be101c11de2A",
    contractAddress: "0xEA8839A12F91429f8eA8CDb3C0FEf14839eEbEc1",
    intialFund: "0",
    lastBlock: 40576348,
    decimals: 18,
    blockChunks: 1000,
  },
};


export type TSupportedChainsConfig = (typeof bridgeTestChains)[number];
export type TSupportedChains = TSupportedChainsConfig["chain"];
export type TSupportedChainTypes = TSupportedChainsConfig["chainType"];
