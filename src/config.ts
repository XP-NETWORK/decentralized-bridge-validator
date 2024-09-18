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
    lastBlock: 43000496,
    decimals: 18,
    blockChunks: 1000,
  },
  {
    chain: "MOONBEAM",
    rpcURL: "https://rpc.api.moonbase.moonbeam.network",
    nativeCoinSymbol: "DEV",
    intialFund: "50000000000000000",
    contractAddress: "0x4144b9255B45691E1Cc9BEdE04726b26ebd6C90A",
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
    contractAddress: "0xf33e51DccC7727F1ac62782de7811712420841a0",
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
    contractAddress: "KT1Fh6VH8BxA9xgJCn8hGZRxoo2vY3hrbqeV",
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
      "erd1qqqqqqqqqqqqqpgqhrd7fhw946fsq2kpl753xxthvy4jawvnd9yq03u2hq",
    decimals: 18,
    elasticSearchURL: "https://devnet-index.multiversx.com",
    gatewayURL: "https://devnet-gateway.multiversx.com",
    intialFund: "50000000000000000",
    nativeCoinSymbol: "EGLD",
    lastBlock: 4757826,
  },
  {
    chainType: "icp",
    chain: "ICP",
    contractAddress: "bw4dl-smaaa-aaaaa-qaacq-cai",
    decimals: 9,
    intialFund: "100000000",
    lastBlock: 0,
    nativeCoinSymbol: "ICP",
    rpcURL: "https://tools.xp.network/",
  },
  // {
  //   chain: "NEAR",
  //   chainType: "near",
  //   contractAddress: "xp-bridge-test.testnet",
  //   decimals: 24,
  //   intialFund: "100000000000000000000000",
  //   lastBlock: 960126871,
  //   nativeCoinSymbol: "NEAR",
  //   nearBlocksUrl: "https://api-testnet.nearblocks.io/v1/",
  //   networkId: "testnet",
  //   rpcURL: "https://archival-rpc.testnet.near.org",
  // },
] as const satisfies TChain[];

export const storageTestnetConfig: IEvmChainConfig = {
  chain: "SkaleEuropa",
  rpcURL: "https://testnet.skalenodes.com/v1/juicy-low-small-testnet",
  nativeCoinSymbol: "sFUEL",
  intialFund: "0",
  contractAddress: "0x8184bCDC0a4C24D1cB8e054E389660B5b7160186",
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
      contractAddress: "0x289FDdDce5119C41B82C969135212061D5E7Dce5",
      chainType: "evm",
      lastBlock: 42329114,
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
      chain: "BASE",
      rpcURL: "https://base.llamarpc.com",
      nativeCoinSymbol: "BASE",
      intialFund: "5000000000000000",
      contractAddress: "0x2Aa8Dbb7543754d70B5A40D52cB81c2a0bB08B83",
      chainType: "evm",
      lastBlock: 18987568,
      decimals: 18,
      blockChunks: 1000,
    },
    {
      chain: "HEDERA",
      rpcURL: "https://mainnet.hashio.io/api",
      nativeCoinSymbol: "HBAR",
      intialFund: "50000000000000000000",
      contractAddress: "0x00000000000000000000000000000000006bc585",
      chainType: "hedera",
      lastBlock: 68924608,
      royaltyInfoProxyAddress: "0x97fec8ed7203ea3ce58e2a4f44056fd954a35be4",
      decimals: 18,
      blockChunks: 1000,
    },
    {
      chain: "TON",
      rpcURL:
        "https://toncenter.com/api/v2/jsonRPC?api_key=78b6f2e7cbe2900dd39ab51a3f8fe3090154973343929991ed9b4f63fbeb45a5",
      chainType: "ton",
      contractAddress: "EQDn9dWuVp18AMnFc7yrEx6TxDwrbFI8FZYElkY7Exe1QcQO",
      decimals: 9,
      intialFund: "100000000",
      lastBlock: 49042809000002,
      nativeCoinSymbol: "TON",
    },
    {
      blockChunks: 1000,
      chain: "TEZOS",
      chainType: "tezos",
      contractAddress: "KT1N3qtcfxzNMhdRMphvtDCKLEDwVLhZ8Cpq",
      decimals: 9,
      intialFund: "100000000",
      lastBlock: 6572780,
      nativeCoinSymbol: "TEZOS",
      restApiURL: "https://api.tzkt.io",
      rpcURL: "https://mainnet.ecadinfra.com",
    },
  ],
  storageConfig: {
    chain: "OP",
    rpcURL: "https://optimism.llamarpc.com",
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
export type TSupportedChains = TChain["chain"];
export type TSupportedChainTypes = TChain["chainType"];
