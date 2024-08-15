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
    contractAddress: "0xA86704500C991a5C1976756Ee3f458d59240A6cE",
    chainType: "evm",
    lastBlock: 41156199,
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
    contractAddress: "KT1S9vCe85fpjfPNEnuDJ2zb453bSjcGNBH8",
    decimals: 9,
    intialFund: "100000000",
    lastBlock: 7259145,
    nativeCoinSymbol: "TEZOS",
    restApiURL: "https://api.ghostnet.tzkt.io",
    rpcURL: "https://ghostnet.smartpy.io",
  },
  {
    chainType: "multiversX",
    chain: "MULTIVERSX",
    chainID: "D",
    contractAddress:
      "erd1qqqqqqqqqqqqqpgqn5vhjcu3mrctgaj85zx2c5lpph32q408lwzqrl4vys",
    decimals: 18,
    elasticSearchURL: "https://devnet-index.multiversx.com",
    gatewayURL: "https://devnet-gateway.multiversx.com",
    intialFund: "50000000000000000",
    nativeCoinSymbol: "EGLD",
    lastBlock: 4757826,
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
      rpcURL: "https://bsc.blockpi.network/v1/rpc/public",
      nativeCoinSymbol: "BNB",
      intialFund: "50000000000000000",
      contractAddress: "0x289FDdDce5119C41B82C969135212061D5E7Dce5",
      chainType: "evm",
      lastBlock: 41188324,
      decimals: 18,
      blockChunks: 1000,
    },
    {
      chain: "MATIC",
      rpcURL: "https://polygon.llamarpc.com",
      nativeCoinSymbol: "MATIC",
      intialFund: "50000000000000000",
      contractAddress: "0x2011DAD5caE280243d075D12a38CcCc0Fb4412dE",
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
      contractAddress: "0x000000000000000000000000000000000064a394",
      chainType: "hedera",
      lastBlock: 66851249,
      royaltyInfoProxyAddress: "0x97fec8ed7203ea3ce58e2a4f44056fd954a35be4",
      decimals: 18,
      blockChunks: 1000,
    },
    {
      chain: "TON",
      rpcURL:
        "https://toncenter.com/api/v2/jsonRPC?api_key=05645d6b549f33bf80cee8822bd63df720c6781bd00020646deb7b2b2cd53b73",
      chainType: "ton",
      contractAddress: "EQD3MmAJjHK3iyynZMRb0_shk5BdG_wgP4VRIdGfSW5_-Vsu",
      decimals: 9,
      intialFund: "100000000",
      lastBlock: 48309171000006,
      nativeCoinSymbol: "TON",
    },
  ],
  storageConfig: {
    chain: "OP",
    rpcURL: "https://optimism-mainnet.public.blastapi.io",
    nativeCoinSymbol: "OP",
    intialFund: "5000000000000000",
    contractAddress: "0xc6e84955ba7C354fb7ca60011883e5673Be3F629",
    chainType: "evm",
    lastBlock: 123638429,
    decimals: 18,
    blockChunks: 1000,
  },
  stakingConfig: {
    chain: "BSC",
    rpcURL: "https://bsc.blockpi.network/v1/rpc/public",
    coinSymbol: "XPNET",
    nativeCoinSymbol: "BNB",
    chainType: "evm",
    coinAddress: "0x8cf8238abf7b933Bf8BB5Ea2C7E4Be101c11de2A",
    contractAddress: "0xD7f7aa3e438B5640caDe99070336093833e19448",
    intialFund: "0",
    lastBlock: 41099482,
    decimals: 18,
    blockChunks: 1000,
  },
};

export type TSupportedChainsConfig = (typeof bridgeTestChains)[number];
export type TSupportedChains = TSupportedChainsConfig["chain"];
export type TSupportedChainTypes = TSupportedChainsConfig["chainType"];
