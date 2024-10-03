import { MikroORM } from "@mikro-orm/core";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers/out";
import { UserSigner } from "@multiversx/sdk-wallet/out";
import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";
import { TonClient, WalletContractV4 } from "@ton/ton";
import { JsonRpcProvider, NonceManager, Wallet } from "ethers";
import { SecretNetworkClient, Wallet as SecretWallet } from "secretjs";
import TonWeb from "tonweb";
import { privateKeyToAccount } from "web3-eth-accounts";
import type { TSupportedChainTypes, TSupportedChains } from "./config";
import {
  type BridgeStorage,
  BridgeStorage__factory,
  type ERC20Staking,
} from "./contractsTypes/evm";
import { evmHandler } from "./handler/evm";
import { multiversxHandler } from "./handler/multiversx";
import { secretsHandler } from "./handler/secrets";
import { tezosHandler } from "./handler/tezos";
import { raise, tonHandler } from "./handler/ton";

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1Wallet } from "@cosmjs/proto-signing";
import { HttpAgent } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import type { EntityManager } from "@mikro-orm/sqlite";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { Mutex } from "async-mutex";
import axios, { type AxiosInstance } from "axios";
import {
  KeyPair,
  type Near,
  InMemorySigner as NearInMemorySigner,
  connect,
  keyStores,
} from "near-api-js";
import { ERC20Staking__factory } from "./contractsTypes/evm";
import { cosmWasmHandler } from "./handler/cosmos";
import { evmStakingHandler } from "./handler/evm/stakingHandler";
import type { MutexReleaser } from "./handler/evm/types";
import { icpHandler } from "./handler/icp";
import { nearHandler } from "./handler/near";
import type { LogInstance, THandler } from "./handler/types";
import MikroOrmConfig from "./mikro-orm.config";
import { Block } from "./persistence/entities/block";
import type {
  CosmWasmWallet,
  IBridgeConfig,
  ICosmWasmChainConfig,
  IEvmChainConfig,
  IEvmWallet,
  IGeneratedWallets,
  IHederaChainConfig,
  IICPChainConfig,
  IICPWallet,
  IMultiversXChainConfig,
  IMultiversXWallet,
  INearChainConfig,
  INearWallet,
  ISecretChainConfig,
  ISecretWallet,
  IStakingConfig,
  ITezosChainConfig,
  ITezosWallet,
  ITonChainConfig,
  ITonWallet,
} from "./types";

export async function configEvmHandler(
  conf: IEvmChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  wallet: IEvmWallet,
  serverLinkHandler: AxiosInstance | undefined,
  evmLogger: LogInstance,
  staking: ERC20Staking,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const mutex = new Mutex();
  const provider = new JsonRpcProvider(conf.rpcURL);
  const fetchProvider = async (): Promise<[JsonRpcProvider, MutexReleaser]> => {
    const release = await mutex.acquire();
    return [provider, release];
  };
  return evmHandler({
    blockChunks: conf.blockChunks,
    bridge: conf.contractAddress,
    chainIdent: conf.chain as TSupportedChains,
    currency: conf.nativeCoinSymbol,
    decimals: conf.decimals,
    em: em.fork(),
    initialFunds: BigInt(conf.intialFund),
    lastBlock_: lb?.lastBlock ?? conf.lastBlock,
    fetchProvider: fetchProvider,
    signer: new Wallet(wallet.privateKey),
    storage,
    txSigner: privateKeyToAccount(wallet.privateKey),
    royaltyProxy: undefined,
    chainType: conf.chainType as TSupportedChainTypes,
    serverLinkHandler,
    logger: evmLogger,
    staking,
  });
}

export async function configHederaHandler(
  conf: IHederaChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  wallet: IEvmWallet,
  serverLinkHandler: AxiosInstance | undefined,
  hederaLogger: LogInstance,
  staking: ERC20Staking,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const mutex = new Mutex();
  const provider = new JsonRpcProvider(conf.rpcURL);
  const fetchProvider = async (): Promise<[JsonRpcProvider, MutexReleaser]> => {
    const release = await mutex.acquire();
    return [provider, release];
  };
  return evmHandler({
    blockChunks: conf.blockChunks,
    bridge: conf.contractAddress,
    chainIdent: conf.chain as TSupportedChains,
    currency: conf.nativeCoinSymbol,
    decimals: conf.decimals,
    em: em.fork(),
    initialFunds: BigInt(conf.intialFund),
    lastBlock_: lb?.lastBlock ?? conf.lastBlock,
    fetchProvider: fetchProvider,
    signer: new Wallet(wallet.privateKey),
    storage,
    txSigner: privateKeyToAccount(wallet.privateKey),
    royaltyProxy: conf.royaltyInfoProxyAddress,
    chainType: conf.chainType as TSupportedChainTypes,
    serverLinkHandler,
    logger: hederaLogger,
    staking,
  });
}
export async function configStakingHandler(
  em: EntityManager,
  conf: IStakingConfig,
  logger: LogInstance,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  return evmStakingHandler(
    conf.chain as TSupportedChains,
    new JsonRpcProvider(conf.rpcURL),
    lb?.lastBlock ?? conf.lastBlock,
    conf.blockChunks,
    em.fork(),
    conf.contractAddress,
    logger,
  );
}

export async function configIcpHandler(
  conf: IICPChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  icpWallet: IICPWallet,
  serverLinkHandler: AxiosInstance | undefined,
  icpLogger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
): Promise<THandler> {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const identity = Ed25519KeyIdentity.fromSecretKey(
    Buffer.from(icpWallet.privateKey, "hex"),
  );
  const agent = await HttpAgent.create({
    host: conf.rpcURL,
    identity,
  });
  await agent.fetchRootKey();
  const mutex = new Mutex();
  async function fetchProvider() {
    const release = await mutex.acquire();
    return [agent, release] as [HttpAgent, MutexReleaser];
  }
  return icpHandler({
    fetchProvider,
    bridge: conf.contractAddress,
    chainIdent: "ICP",
    chainType: "icp",
    decimals: 9,
    em: em.fork(),
    identity,
    initialFunds: BigInt(conf.intialFund),
    lastBlock_: lb?.lastBlock ?? conf.lastBlock,
    logger: icpLogger,
    serverLinkHandler,
    validatorAddress,
    storage,
    staking,
  });
}

export async function configTezosHandler(
  conf: ITezosChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  tezosWallet: ITezosWallet,
  serverLinkHandler: AxiosInstance | undefined,
  tzLogger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const provider = new TezosToolkit(conf.rpcURL);
  const signer = new InMemorySigner(tezosWallet.secretKey);
  provider.setSignerProvider(signer);
  const mutex = new Mutex();
  async function fetchProvider() {
    const release = await mutex.acquire();
    return [provider, release] as [TezosToolkit, MutexReleaser];
  }
  return tezosHandler({
    fetchProvider: fetchProvider,
    signer,
    bridge: conf.contractAddress,
    storage,
    lastBlock_: lb?.lastBlock ?? conf.lastBlock,
    blockChunks: conf.blockChunks,
    restApiUrl: conf.restApiURL,
    initialFunds: BigInt(conf.intialFund),
    em: em.fork(),
    decimals: conf.decimals,
    chainIdent: conf.chain as TSupportedChains,
    chainType: conf.chainType as TSupportedChainTypes,
    serverLinkHandler,
    logger: tzLogger,
    staking,
    validatorAddress,
  });
}

export async function configCosmWasmChainHandler(
  conf: ICosmWasmChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  cosmWasmWallet: CosmWasmWallet,
  serverLinkHandler: AxiosInstance | undefined,
  cwLogger: LogInstance,
) {
  const directWallet = await DirectSecp256k1Wallet.fromKey(
    Buffer.from(cosmWasmWallet.privateKey, "hex"),
    conf.walletPrefix,
  );
  const client = await SigningCosmWasmClient.connectWithSigner(
    conf.rpcURL,
    directWallet,
  );
  const mutex = new Mutex();
  async function fetchProvider() {
    const release = await mutex.acquire();
    return [client, release] as [SigningCosmWasmClient, MutexReleaser];
  }
  return cosmWasmHandler({
    chainIdent: conf.chain as TSupportedChains,
    blockChunks: conf.blockChunks,
    bridge: conf.contractAddress,
    fetchProvider,
    currency: conf.nativeCoinSymbol,
    decimals: conf.decimals,
    em: em.fork(),
    initialFunds: BigInt(conf.intialFund),
    lastBlock_: conf.lastBlock,
    privateKey: cosmWasmWallet.privateKey,
    publicKey: cosmWasmWallet.publicKey,
    storage: storage,
    wallet: directWallet,
    chainType: conf.chainType as TSupportedChainTypes,
    serverLinkHandler,
    logger: cwLogger,
  });
}

export async function configSecretHandler(
  conf: ISecretChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  secretWallet: ISecretWallet,
  serverLinkHandler: AxiosInstance | undefined,
  scrtLogger: LogInstance,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const wallet = new SecretWallet(secretWallet.privateKey);
  const client = new SecretNetworkClient({
    chainId: conf.chainId,
    url: conf.rpcURL,
    wallet: wallet,
    walletAddress: wallet.address,
  });
  const mutex = new Mutex();
  async function fetchProvider() {
    const release = await mutex.acquire();
    return [client, release] as [SecretNetworkClient, MutexReleaser];
  }
  return secretsHandler({
    fetchProvider,
    wallet,
    publicKey: secretWallet.publicKey,
    privateKey: secretWallet.privateKey,
    bridge: conf.contractAddress,
    bridgeCodeHash:
      (
        await client.query.compute.codeHashByContractAddress({
          contract_address: conf.contractAddress,
        })
      ).code_hash ?? raise("Failed to get Code Hash"),
    storage,
    lastBlock_: lb?.lastBlock ?? conf.lastBlock,
    blockChunks: conf.blockChunks,
    initialFunds: BigInt(conf.intialFund),
    em: em.fork(),
    decimals: conf.decimals,
    chainIdent: conf.chain as TSupportedChains,
    chainType: conf.chainType as TSupportedChainTypes,
    serverLinkHandler,
    logger: scrtLogger,
  });
}

export async function configMultiversXHandler(
  conf: IMultiversXChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  multiversXWallet: IMultiversXWallet,
  serverLinkHandler: AxiosInstance | undefined,
  mxLogger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const provider = new ProxyNetworkProvider(conf.gatewayURL);
  const mutex = new Mutex();
  async function fetchProvider() {
    const release = await mutex.acquire();
    return [provider, release] as [ProxyNetworkProvider, MutexReleaser];
  }
  return multiversxHandler({
    provider: fetchProvider,
    gatewayURL: conf.gatewayURL,
    signer: UserSigner.fromWallet(
      multiversXWallet.userWallet,
      multiversXWallet.password,
    ),
    chainID: conf.chainID,
    bridge: conf.contractAddress,
    storage,
    lastBlock: lb?.lastBlock ?? conf.lastBlock,
    initialFunds: BigInt(conf.intialFund),
    em: em.fork(),
    chainIdent: conf.chain as TSupportedChains,
    chainType: conf.chainType as TSupportedChainTypes,
    decimals: conf.decimals,
    serverLinkHandler,
    logger: mxLogger,
    staking,
    validatorAddress,
  });
}

export async function configNearHandler(
  conf: INearChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  nearWallet: INearWallet,
  serverLinkHandler: AxiosInstance | undefined,
  nearLogger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
) {
  const near = await connect({
    networkId: conf.networkId,
    nodeUrl: conf.rpcURL,
  });

  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });

  const ks = new keyStores.InMemoryKeyStore();

  ks.setKey(
    conf.networkId,
    nearWallet.accountId,
    KeyPair.fromString(nearWallet.secretKey as never),
  );
  const mutex = new Mutex();
  async function fetchProvider() {
    const release = await mutex.acquire();
    return [near, release] as [Near, MutexReleaser];
  }
  return nearHandler({
    fetchProvider,
    address: nearWallet.accountId,
    bridge: conf.contractAddress,
    chainIdent: "NEAR",
    chainType: "near",
    decimals: 24,
    em: em.fork(),
    initialFunds: BigInt(conf.intialFund),
    lastBlock_: lb?.lastBlock ?? conf.lastBlock,
    logger: nearLogger,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    nearBlocksApiKey: process.env.nearBlocksApiKey!,
    nearBlocksUrl: conf.nearBlocksUrl,
    networkId: conf.networkId,
    storage,
    privateKey: nearWallet.secretKey,
    signer: new NearInMemorySigner(ks),
    theGraphApiUrl: conf.theGraphApiUrl,
    serverLinkHandler: serverLinkHandler,
    validatorAddress,
    staking,
  });
}

export async function configTonHandler(
  conf: ITonChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  tonWallet: ITonWallet,
  serverLinkHandler: AxiosInstance | undefined,
  tonLogger: LogInstance,
) {
  const endpoint = await getHttpEndpoint({
    network: conf.network,
  }); // get the decentralized RPC endpoint
  console.log(endpoint);
  const client = new TonClient({
    endpoint: endpoint,
  });
  const signer = WalletContractV4.create({
    publicKey: Buffer.from(tonWallet.publicKey, "hex"),
    workchain: 0,
  });
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const mutex = new Mutex();
  async function fetchClient() {
    const release = await mutex.acquire();
    return [client, release] as [TonClient, MutexReleaser];
  }
  return tonHandler({
    fetchClient,
    provider: new TonWeb.HttpProvider(endpoint),
    signer,
    bridge: conf.contractAddress,
    storage,
    lastBlock_: lb?.lastBlock ?? conf.lastBlock,
    walletSender: client
      .open(signer)
      .sender(Buffer.from(tonWallet.secretKey, "hex")),
    secretKey: tonWallet.secretKey,
    initialFunds: BigInt(conf.intialFund),
    em: em.fork(),
    decimals: conf.decimals,
    chainIdent: conf.chain as TSupportedChains,
    chainType: conf.chainType as TSupportedChainTypes,
    serverLinkHandler,
    logger: tonLogger,
  });
}

export async function configDeps(
  config: IBridgeConfig,
  secrets: IGeneratedWallets,
  logger: LogInstance,
) {
  const storageProvider = new JsonRpcProvider(config.storageConfig.rpcURL);
  const stakingProvider = new JsonRpcProvider(config.stakingConfig.rpcURL);
  const storageSigner = new Wallet(
    secrets.evmWallet.privateKey,
    storageProvider,
  );
  let nonce = await storageSigner.getNonce();
  const lock = new Mutex();

  const fetchNonce = async () => {
    const _release = await lock.acquire();
    const release = async () => {
      nonce = await storageSigner.getNonce();
      return _release();
    };
    const used = () => {
      nonce += 1;
      return _release();
    };
    return [nonce, used, release] as const;
  };

  const storage = BridgeStorage__factory.connect(
    config.storageConfig.contractAddress,
    storageSigner,
  );
  const staking = ERC20Staking__factory.connect(
    config.stakingConfig.contractAddress,
    new NonceManager(new Wallet(secrets.evmWallet.privateKey, stakingProvider)),
  );
  const orm = await MikroORM.init(MikroOrmConfig);
  await orm.schema.updateSchema();
  const em = orm.em;
  const serverLinkHandler = process.env.SERVER_LINK
    ? axios.create({
        baseURL: process.env.SERVER_LINK,
      })
    : undefined;

  const tz = config.bridgeChains.find((e) => e.chainType === "tezos");
  const tzHelper = tz
    ? await configTezosHandler(
        tz as ITezosChainConfig,
        storage,
        em.fork(),
        secrets.tezosWallet,
        serverLinkHandler,
        logger.getSubLogger({ name: "TEZOS" }),
        staking,
        secrets.evmWallet.address,
      )
    : undefined;

  const scrtc = config.bridgeChains.find((e) => e.chainType === "scrt");
  const scrt = scrtc
    ? await configSecretHandler(
        scrtc as ISecretChainConfig,
        storage,
        em.fork(),
        secrets.secretWallet,
        serverLinkHandler,
        logger.getSubLogger({ name: "SECRET" }),
      )
    : undefined;

  const mxc = config.bridgeChains.find((e) => e.chainType === "multiversX");
  const mx = mxc
    ? await configMultiversXHandler(
        mxc as IMultiversXChainConfig,
        storage,
        em.fork(),
        secrets.multiversXWallet,
        serverLinkHandler,
        logger.getSubLogger({ name: "MULTIVERSX" }),
        staking,
        secrets.evmWallet.address,
      )
    : undefined;

  const tonc = config.bridgeChains.find((e) => e.chainType === "ton");

  const ton = tonc
    ? await configTonHandler(
        tonc as ITonChainConfig,
        storage,
        em.fork(),
        secrets.tonWallet,
        serverLinkHandler,
        logger.getSubLogger({ name: "TON" }),
      )
    : undefined;

  const icpc = config.bridgeChains.find((e) => e.chainType === "icp");

  const icp = icpc
    ? await configIcpHandler(
        icpc,
        storage,
        em.fork(),
        secrets.icpWallet,
        serverLinkHandler,
        logger.getSubLogger({ name: "ICP" }),
        staking,
        secrets.evmWallet.address,
      )
    : undefined;

  const nearc = config.bridgeChains.find((e) => e.chainType === "near");

  const near = nearc
    ? await configNearHandler(
        nearc,
        storage,
        em.fork(),
        secrets.nearWallet,
        serverLinkHandler,
        logger.getSubLogger({ name: "NEAR" }),
        staking,
        secrets.evmWallet.address,
      )
    : undefined;

  return {
    storage,
    em,
    storageSigner,
    storageProvider,
    serverLinkHandler,
    fetchNonce,
    staking: await configStakingHandler(
      em.fork(),
      config.stakingConfig,
      logger,
    ),
    chains: [
      // Configure Ethereum Virtual Machine (EVM) chains iteratively as they share the same configuration pattern
      ...(await Promise.all(
        config.bridgeChains
          .filter((e) => e.chainType === "evm")
          .map((c) => {
            const config = c as IEvmChainConfig;
            return configEvmHandler(
              config,
              storage,
              em.fork(),
              secrets.evmWallet,
              serverLinkHandler,
              logger.getSubLogger({ name: c.chain }),
              staking,
            );
          }),
      )),
      ...(await Promise.all(
        config.bridgeChains
          .filter((e) => e.chainType === "hedera")
          .map((c) => {
            const config = c as IHederaChainConfig;
            return configHederaHandler(
              config,
              storage,
              em.fork(),
              secrets.evmWallet,
              serverLinkHandler,
              logger.getSubLogger({ name: "HEDERA" }),
              staking,
            );
          }),
      )),
      ...(await Promise.all(
        config.bridgeChains
          .filter((e) => e.chainType === "cosmwasm")
          .map((c) => {
            const config = c as ICosmWasmChainConfig;
            return configCosmWasmChainHandler(
              config,
              storage,
              em.fork(),
              secrets.secretWallet,
              serverLinkHandler,
              logger.getSubLogger({ name: c.chain }),
            );
          }),
      )),
      tzHelper,
      scrt,
      mx,
      ton,
      icp,
      near,
    ].filter((e) => e !== undefined) as THandler[],
  };
}
