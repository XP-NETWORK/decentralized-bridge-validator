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
    contractAddress: "0xA70D9c05EB97FeDF4EA6CD52Dc426E66C0959968",
    chainType: "evm",
    lastBlock: 42367810,
    decimals: 18,
    blockChunks: 1000,
  },
  {
    chain: "MOONBEAM",
    rpcURL: "https://rpc.api.moonbase.moonbeam.network",
    nativeCoinSymbol: "DEV",
    intialFund: "50000000000000000",
    contractAddress: "0x2b4082b5cBe5958888d68985524939ec1c871007",
    chainType: "evm",
    lastBlock: 7970143,
    decimals: 18,
    blockChunks: 1000,
  },
  {
    chain: "HEDERA",
    rpcURL: "https://testnet.hashio.io/api",
    nativeCoinSymbol: "HBAR",
    intialFund: "50000000000000000",
    contractAddress: "0x5AaC11DDCf117A789f339ece3CBC23756985E554",
    chainType: "evm",
    lastBlock: 6959861,
    decimals: 18,
    blockChunks: 1000,
  },
  {
    chain: "TON",
    rpcURL: "https://testnet.toncenter.com/api/v2/jsonRPC",
    chainType: "ton",
    contractAddress: "kQCHrjSTU6W7XYUfJgwr_trmG3QL_llPJfPyXPmINYznrkh6",
    decimals: 9,
    intialFund: "100000000",
    lastBlock: 24014875000001,
    nativeCoinSymbol: "TON",
  },
  {
    blockChunks: 1000,
    chain: "TEZOS",
    chainType: "tezos",
    contractAddress: "KT1UGfH2Hk2MVKt8ADqqkRqcGZussRnfpahV",
    decimals: 9,
    intialFund: "100000000",
    lastBlock: 7259145,
    nativeCoinSymbol: "TEZOS",
    restApiURL: "https://api.ghostnet.tzkt.io",
    rpcURL: "https://ghostnet.smartpy.io",
  },
] as const satisfies TChain[];

export const storageTestnetConfig: IEvmChainConfig = {
  chain: "SkaleEuropa",
  rpcURL: "https://testnet.skalenodes.com/v1/juicy-low-small-testnet",
  nativeCoinSymbol: "sFUEL",
  intialFund: "0",
  contractAddress: "0x04cAEd1763B2C121D92FcaEaB41BFfe3EAB57EFC",
  chainType: "evm",
  lastBlock: 2209753,
  decimals: 18,
  blockChunks: 1000,
};

export const stakingTestChain: IStakingConfig = {
  chain: "SkaleEuropa",
  rpcURL: "https://testnet.skalenodes.com/v1/juicy-low-small-testnet",
  coinSymbol: "DummyERC20",
  nativeCoinSymbol: "sFUEL",
  chainType: "evm",
  coinAddress: "0x491f505AbD292372f7D9a8C6B12d3a8d3894C8b6",
  contractAddress: "0x2b4082b5cBe5958888d68985524939ec1c871007",
  intialFund: "0",
  lastBlock: 2209753,
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
      contractAddress: "0x0E8457f9F2a323DD91673e2D8e9eCA80763Dd98f",
      chainType: "evm",
      lastBlock: 40722598,
      decimals: 18,
      blockChunks: 1000,
    },
    {
      chain: "MATIC",
      rpcURL: "https://polygon-pokt.nodies.app",
      nativeCoinSymbol: "MATIC",
      intialFund: "50000000000000000",
      contractAddress: "0xDAc202538A33adC727e95768f472f232eDD2EC56",
      chainType: "evm",
      lastBlock: 59709068,
      decimals: 18,
      blockChunks: 1000,
    },
    {
      chain: "HEDERA",
      rpcURL: "https://mainnet.hashio.io/api",
      nativeCoinSymbol: "HBAR",
      intialFund: "50000000000000000000",
      contractAddress: "0xdb3ae6531d405d341d7b25597a64082d7ed05a07",
      chainType: "hedera",
      lastBlock: 66851249,
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
    contractAddress: "0xA8802be1Bd39888EBD38b236e2A4fAd4d8e76a1d",
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
    contractAddress: "0xDbA9bC0F6c9a59334Fb1e1dc4E50f0E21aAB3Ac7",
    intialFund: "0",
    lastBlock: 40722598,
    decimals: 18,
    blockChunks: 1000,
  },
};

export type TSupportedChainsConfig = (typeof bridgeTestChains)[number];
export type TSupportedChains = TSupportedChainsConfig["chain"];
export type TSupportedChainTypes = TSupportedChainsConfig["chainType"];
