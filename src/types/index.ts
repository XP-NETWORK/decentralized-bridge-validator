type IMultiversXWallet = {
  password: string;
  privateKey: string;
  address: string;
};

type ITonWallet = {
  publicKey: string;
  secretKey: string;
};

type IEvmWallet = {
  address: string;
  privateKey: string;
};
type IHederaWallet = {
  address: string;
  privateKey: string;
};

type ISecretWallet = {
  publicKey: string;
  privateKey: string;
};

type ITezosWallet = {
  publicKey: string;
  secretKey: string;
};

type IGeneratedWallets = {
  evmWallet: IEvmWallet;
  multiversXWallet: IMultiversXWallet;
  tonWallet: ITonWallet;
  secretWallet: ISecretWallet;
  tezosWallet: ITezosWallet;
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
};
type IChainConfigAndWallets = {
  chainConfig: TChain;
  wallets: IGeneratedWallets;
};
type IEvmChainConfig = {
  chainType: "evm";
  rpcURL: string;
} & IChainConfig;

type IHederaChainConfig = {
  chainType: "hedera";
  rpcURL: string;
  royaltyInfoProxyAddress: string;
} & IChainConfig;

type ISecretChainConfig = {
  chainType: "scrt";
  rpcURL: string;
  chainId: string;
} & IChainConfig;

type ITonChainConfig = {
  chainType: "ton";
  rpcURL: string;
} & IChainConfig;

type ITezosChainConfig = {
  chainType: "tezos";
  restApiURL: string;
  rpcURL: string;
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

type IStakingChainConfigAndEvmWallet = {
  stakingChainConfig: IStakingConfig;
  evmWallet: IEvmWallet;
};
type IStakingChainConfigAndWallets = {
  stakingChainConfig: IStakingConfig;
  wallets: IGeneratedWallets;
};

type TChain =
  | IMultiversXChainConfig
  | IEvmChainConfig
  | ITonChainConfig
  | ISecretChainConfig
  | ITezosChainConfig
  | IHederaChainConfig;

type IBridgeConfig = {
  bridgeChains: TChain[];
  storageConfig: IEvmChainConfig;
  stakingConfig: IStakingConfig;
};

export type SignerAndSignature = {
  signer: string;
  signature: string;
};

export {
  IBridgeConfig,
  IChainConfig,
  IChainConfigAndWallets,
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
  IStakingChainConfigAndEvmWallet,
  IStakingChainConfigAndWallets,
  IStakingConfig,
  ITezosChainConfig,
  ITezosWallet,
  ITonChainConfig,
  ITonWallet,
  TChain,
};
