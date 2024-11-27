// import { Network } from "@aptos-labs/ts-sdk";
// import { Network } from "@aptos-labs/ts-sdk";
import type {
  IBridgeConfig,
  IEvmChainConfig,
  IStakingConfig,
  TChain,
} from "./types";

import { config } from "dotenv";

config();

export const bridgeTestChains = [
  {
    chain: "BSC",
    rpcURL: "https://bsc-testnet-rpc.publicnode.com",
    nativeCoinSymbol: "BNB",
    intialFund: "50000000000000000",
    contractAddress: "0xA86704500C991a5C1976756Ee3f458d59240A6cE",
    chainType: "evm",
    lastBlock: 44352352,
    decimals: 18,
    blockChunks: 1000,
  },
  // {
  //   chain: "MOONBEAM",
  //   rpcURL: "https://rpc.api.moonbase.moonbeam.network",
  //   nativeCoinSymbol: "DEV",
  //   intialFund: "50000000000000000",
  //   contractAddress: "0x4144b9255B45691E1Cc9BEdE04726b26ebd6C90A",
  //   chainType: "evm",
  //   lastBlock: 7970143,
  //   decimals: 18,
  //   blockChunks: 1000,
  // },
  // {
  //   chain: "HEDERA",
  //   rpcURL: "https://testnet.hashio.io/api",
  //   nativeCoinSymbol: "HBAR",
  //   intialFund: "50000000000000000",
  //   contractAddress: "0xf33e51DccC7727F1ac62782de7811712420841a0",
  //   chainType: "evm",
  //   lastBlock: 6959861,
  //   decimals: 18,
  //   blockChunks: 1000,
  // },
  // {
  //   chain: "TON",
  //   rpcURL: "https://testnet.toncenter.com/api/v2/jsonRPC",
  //   chainType: "ton",
  //   contractAddress: "kQCHrjSTU6W7XYUfJgwr_trmG3QL_llPJfPyXPmINYznrkh6",
  //   decimals: 9,
  //   intialFund: "100000000",
  //   lastBlock: 24014875000001,
  //   nativeCoinSymbol: "TON",
  //   network: "testnet",
  // },
  // {
  //   chain: "SECRET",
  //   blockChunks: 1000,
  //   chainType: "scrt",
  //   chainId: "secret-4",
  //   contractAddress: "secret1zyd2j3wqkeagcuzhklewfa6u26epn672cuktnm",
  //   decimals: 6,
  //   intialFund: "10000000",
  //   lastBlock: 16833475,
  //   nativeCoinSymbol: "SCRT",
  //   rpcURL: "https://rpc.ankr.com/http/scrt_cosmos",
  // },
  // {
  //   blockChunks: 1000,
  //   chain: "TEZOS",
  //   chainType: "tezos",
  //   contractAddress: "KT1Fh6VH8BxA9xgJCn8hGZRxoo2vY3hrbqeV",
  //   decimals: 9,
  //   intialFund: "100000000",
  //   lastBlock: 7259145,
  //   nativeCoinSymbol: "TEZOS",
  //   restApiURL: "https://api.ghostnet.tzkt.io",
  //   rpcURL: "https://ghostnet.smartpy.io",
  // },
  // {
  //   chainType: "multiversX",
  //   chain: "MULTIVERSX",
  //   chainID: "D",
  //   contractAddress:
  //     "erd1qqqqqqqqqqqqqpgq4tfugv4aks67l6ggh2zs0xuxk7d00x4ttxsqud4vpp",
  //   decimals: 18,
  //   elasticSearchURL: "https://devnet-index.multiversx.com",
  //   gatewayURL: "https://devnet-gateway.multiversx.com",
  //   intialFund: "50000000000000000",
  //   nativeCoinSymbol: "EGLD",
  //   lastBlock: 1728382333,
  // },
  // {
  //   chainType: "icp",
  //   chain: "ICP",
  //   contractAddress: "bw4dl-smaaa-aaaaa-qaacq-cai",
  //   decimals: 9,
  //   intialFund: "100000000",
  //   lastBlock: 0,
  //   nativeCoinSymbol: "ICP",
  //   rpcURL: "https://tools.xp.network/",
  // },
  // {
  //   chain: "NEAR",
  //   chainType: "near",
  //   contractAddress: "xp-bridge-test.testnet",
  //   decimals: 24,
  //   intialFund: "100000000000000000000000",
  //   lastBlock: 0,
  //   nativeCoinSymbol: "NEAR",
  //   nearBlocksUrl: "https://api-testnet.nearblocks.io/v1/",
  //   networkId: "testnet",
  //   rpcURL: "https://archival-rpc.testnet.near.org",
  //   theGraphApiUrl:
  //     "https://api.studio.thegraph.com/query/89122/near-xp/version/latest",
  // },
  // {
  //   chain: "BLAST",
  //   rpcURL: "https://blast-sepolia.blockpi.network/v1/rpc/public",
  //   nativeCoinSymbol: "ETH",
  //   intialFund: "50000000000000000",
  //   contractAddress: "0x2Aa8Dbb7543754d70B5A40D52cB81c2a0bB08B83",
  //   chainType: "evm",
  //   lastBlock: 11980723,
  //   decimals: 18,
  //   blockChunks: 1000,
  // },
  // {
  //   chain: "APTOS",
  //   chainType: "aptos",
  //   contractAddress:
  //     "0x68c508b1b20701c8ddecbbc8e603e788be96c1dcb6ccdcf43ac8594f6f49077a",
  //   decimals: 8,
  //   intialFund: "100000000",
  //   lastBlock: 0,
  //   nativeCoinSymbol: "APT",
  //   network: Network.TESTNET,
  // },
  {
    chainType: "casper",
    chain: "CASPER",
    network: "casper-test",
    contractAddress:
      "1acfa310d1ffde79f4680c3b7afe7416c292dbb745cbc2f70c41599a3d3a727d",
    decimals: 9,
    intialFund: "1000000000",
    lastBlock: 4106745,
    nativeCoinSymbol: "CSPR",
    rpcURL: "https://rpc.testnet.casperlabs.io",
  },
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
      rpcURL:
        process.env.BSC_RPC ||
        "https://bsc-mainnet.core.chainstack.com/4ede26f00678567eeb2f7baee8101e04",
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
      rpcURL:
        process.env.MATIC_RPC ||
        "https://polygon-mainnet.core.chainstack.com/56a6be3b396d25f24ceab02d4aaf54d0",
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
      rpcURL:
        process.env.BASE_RPC ||
        "https://base-mainnet.core.chainstack.com/723e09b9165bbbe48f42ccab919e33c6",
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
      rpcURL: process.env.HEDERA_RPC || "https://mainnet.hashio.io/api",
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
        process.env.TON_RPC ||
        "https://toncenter.com/api/v2/jsonRPC?api_key=78b6f2e7cbe2900dd39ab51a3f8fe3090154973343929991ed9b4f63fbeb45a5",
      chainType: "ton",
      contractAddress: "EQDn9dWuVp18AMnFc7yrEx6TxDwrbFI8FZYElkY7Exe1QcQO",
      decimals: 9,
      intialFund: "100000000",
      lastBlock: 49042809000002,
      nativeCoinSymbol: "TON",
      network: "mainnet",
    },
    {
      blockChunks: 1000,
      chain: "TEZOS",
      chainType: "tezos",
      contractAddress: "KT1UMVUP3XBpPrMUwuC6DXjEcLgZykV7p1PW",
      decimals: 9,
      intialFund: "100000000",
      lastBlock: 6625053,
      nativeCoinSymbol: "TEZOS",
      restApiURL: "https://api.tzkt.io",
      rpcURL: process.env.TEZOS_RPC || "https://mainnet.ecadinfra.com",
    },
    // {
    //   chainType: "icp",
    //   chain: "ICP",
    //   contractAddress: "6gfde-pqaaa-aaaal-al76q-cai",
    //   decimals: 8,
    //   intialFund: "10000000",
    //   lastBlock: 0,
    //   nativeCoinSymbol: "ICP",
    //   rpcURL: "https://ic0.app",
    // },
    {
      chainType: "multiversX",
      chain: "MULTIVERSX",
      chainID: "1",
      contractAddress:
        "erd1qqqqqqqqqqqqqpgqmads3ruz3ywdq47a2whdgwsxdvtgut84txsqnuwr6c",
      decimals: 18,
      elasticSearchURL: "https://index.multiversx.com",
      gatewayURL: "https://gateway.multiversx.com",
      intialFund: "50000000000000000",
      nativeCoinSymbol: "EGLD",
      lastBlock: 1728301060,
    },
    {
      chain: "BLAST",
      rpcURL: "https://blast.gateway.tenderly.co",
      nativeCoinSymbol: "ETH",
      intialFund: "1000000000000000",
      contractAddress: "0x2Aa8Dbb7543754d70B5A40D52cB81c2a0bB08B83",
      chainType: "evm",
      lastBlock: 10219223,
      decimals: 18,
      blockChunks: 1000,
    },
    {
      chain: "FANTOM",
      rpcURL: process.env.FANTOM_RPC || "https://rpc.fantom.network",
      nativeCoinSymbol: "FTM",
      intialFund: "1000000000000000",
      contractAddress: "0x2Aa8Dbb7543754d70B5A40D52cB81c2a0bB08B83",
      chainType: "evm",
      lastBlock: 95607842,
      decimals: 18,
      blockChunks: 1000,
    },
    {
      chain: "AVALANCHE",
      rpcURL:
        process.env.AVALANCHE_RPC ||
        "https://endpoints.omniatech.io/v1/avax/mainnet/public",
      nativeCoinSymbol: "AVAX",
      intialFund: "1000000000000000",
      contractAddress: "0x92764FF21a1a8cC4e8eEec43ED04Bea3B76D8fD3",
      chainType: "evm",
      lastBlock: 52801405,
      decimals: 18,
      blockChunks: 1000,
    },
  ],
  storageConfig: {
    chain: "OP",
    rpcURL:
      process.env.OPT_RPC ||
      "https://optimism-mainnet.core.chainstack.com/eb8e1f7806a102e3bd7313c67dcf9f18",
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
    rpcURL:
      process.env.BSC_RPC ||
      "https://bsc-mainnet.core.chainstack.com/4ede26f00678567eeb2f7baee8101e04",
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
