import type { Network } from "@aptos-labs/ts-sdk";

type ISecretKeyCrypto = {
  ciphertext: string;
  cipherparams: {
    iv: string;
  };
  cipher: string;
  kdf: string;
  kdfparams: {
    dklen: number;
    salt: string;
    n: number;
    r: number;
    p: number;
  };
  mac: string;
};

type ISecretKey = {
  version: number;
  kind: string;
  id: string;
  address: string;
  bech32: string;
  crypto: ISecretKeyCrypto;
};

type IMultiversXWallet = {
  password: string;
  userWallet: ISecretKey;
};
type ITonWallet = {
  publicKey: string;
  secretKey: string;
};

type IAptosWallet = {
  privateKey: string;
  publicKey: string;
  address: string;
};

type INearWallet = {
  publicKey: string;
  secretKey: string;
  accountId: string;
};

type IEvmWallet = {
  address: string;
  privateKey: string;
};
type ICasperWallet = {
  address: string;
  privateKey: string;
  publicKey: string;
};
type IHederaWallet = {
  address: string;
  privateKey: string;
};

type ISecretWallet = {
  publicKey: string;
  privateKey: string;
};
type CosmWasmWallet = {
  publicKey: string;
  privateKey: string;
};

type ITezosWallet = {
  publicKey: string;
  secretKey: string;
};

export type IICPWallet = {
  publicKey: string;
  privateKey: string;
};

type IGeneratedWallets = {
  evmWallet: IEvmWallet;
  multiversXWallet: IMultiversXWallet;
  tonWallet: ITonWallet;
  secretWallet: ISecretWallet;
  tezosWallet: ITezosWallet;
  icpWallet: IICPWallet;
  nearWallet: INearWallet;
  aptosWallet: IAptosWallet;
  casperWallet: ICasperWallet;
};

type IConfigAndWallets = {
  config: IBridgeConfig;
  wallets: IGeneratedWallets;
};

type IChainConfig = {
  chain: string;
  nativeCoinSymbol: string;
  intialFund: string;
  contractAddress: string;
  lastBlock: number;
  chainType: string;
  decimals: number;
};

type IEvmChainConfig = {
  chainType: "evm";
  rpcURL: string;
  blockChunks: number;
} & IChainConfig;

type IHederaChainConfig = {
  chainType: "hedera";
  rpcURL: string;
  royaltyInfoProxyAddress: string;
  blockChunks: number;
} & IChainConfig;

type IVeChainConfig = {
  chainType: "vechain";
  rpcURL: string;
  blockChunks: number;
} & IChainConfig;

type ISecretChainConfig = {
  chainType: "scrt";
  rpcURL: string;
  chainId: string;
  blockChunks: number;
} & IChainConfig;

type ITonChainConfig = {
  chainType: "ton";
  rpcURL: string;
  network: "testnet" | "mainnet";
} & IChainConfig;

type IAptosChainConfig = {
  chainType: "aptos";
  // ENUMS are not structural
  network: Network;
} & IChainConfig;

type ICasperChainConfig = {
  chainType: "casper";
  rpcURL: string;
  network: "casper-test" | "casper";
} & IChainConfig;

type INearChainConfig = {
  chainType: "near";
  rpcURL: string;
  networkId: "testnet" | "mainnet";
  nearBlocksUrl: string;
  theGraphApiUrl: string;
} & IChainConfig;

type ITezosChainConfig = {
  chainType: "tezos";
  restApiURL: string;
  rpcURL: string;
  blockChunks: number;
} & IChainConfig;

type IMultiversXChainConfig = {
  chainType: "multiversX";
  elasticSearchURL: string;
  gatewayURL: string;
  chainID: string;
} & IChainConfig;

type IStakingConfig = {
  coinSymbol: string;
  coinAddress: string;
  lastBlock: number;
} & IEvmChainConfig;

type ICosmWasmChainConfig = {
  chainType: "cosmwasm";
  rpcURL: string;
  chainId: string;
  blockChunks: number;
  walletPrefix: string;
} & IChainConfig;

export type IICPChainConfig = {
  chainType: "icp";
  rpcURL: string;
} & IChainConfig;

type TChain =
  | IMultiversXChainConfig
  | IEvmChainConfig
  | ITonChainConfig
  | ISecretChainConfig
  | ITezosChainConfig
  | IHederaChainConfig
  | ICosmWasmChainConfig
  | IICPChainConfig
  | INearChainConfig
  | IAptosChainConfig
  | ICasperChainConfig
  | IVeChainConfig;

type IBridgeConfig = {
  bridgeChains: TChain[];
  storageConfig: IEvmChainConfig;
  stakingConfig: IStakingConfig;
};

export type SignerAndSignature = {
  signer: string;
  signature: string;
};

export type {
  IBridgeConfig,
  IChainConfig,
  IConfigAndWallets,
  IEvmChainConfig,
  IEvmWallet,
  IGeneratedWallets,
  IHederaChainConfig,
  IHederaWallet,
  IMultiversXChainConfig,
  IMultiversXWallet,
  ISecretChainConfig,
  ISecretWallet,
  IStakingConfig,
  ICosmWasmChainConfig,
  CosmWasmWallet,
  ITezosChainConfig,
  ITezosWallet,
  ITonChainConfig,
  ITonWallet,
  INearChainConfig,
  INearWallet,
  IAptosChainConfig,
  IAptosWallet,
  TChain,
  ICasperChainConfig,
  ICasperWallet,
  IVeChainConfig,
};
