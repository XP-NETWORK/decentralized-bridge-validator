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
  ITezosChainConfig,
  ITezosWallet,
  ITonChainConfig,
  ITonWallet,
  TChain,
};
