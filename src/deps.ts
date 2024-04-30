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
import { TSupportedChains } from "./config";
import { BridgeStorage, BridgeStorage__factory } from "./contractsTypes/evm";
import { evmHandler } from "./handler/evm";
import { multiversxHandler } from "./handler/multiversx";
import { secretsHandler } from "./handler/secrets";
import { tezosHandler } from "./handler/tezos";
import { raise, tonHandler } from "./handler/ton";

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1Wallet } from "@cosmjs/proto-signing";
import { EntityManager } from "@mikro-orm/sqlite";
import { cosmWasmHandler } from "./handler/cosmos";
import { evmStakingHandler } from "./handler/evm/stakingHandler";
import MikroOrmConfig from "./mikro-orm.config";
import { Block } from "./persistence/entities/block";
import {
  CosmWasmWallet,
  IBridgeConfig,
  ICosmWasmChainConfig,
  IEvmChainConfig,
  IEvmWallet,
  IGeneratedWallets,
  IHederaChainConfig,
  IMultiversXChainConfig,
  IMultiversXWallet,
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
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  return evmHandler({
    blockChunks: conf.blockChunks,
    bridge: conf.contractAddress,
    chainIdent: conf.chain as TSupportedChains,
    currency: conf.nativeCoinSymbol,
    decimals: conf.decimals,
    em: em.fork(),
    initialFunds: BigInt(conf.intialFund),
    lastBlock_: lb?.lastBlock ?? conf.lastBlock,
    provider: new JsonRpcProvider(conf.rpcURL),
    signer: new Wallet(wallet.privateKey),
    storage,
    txSigner: privateKeyToAccount(wallet.privateKey),
  });
}

export async function configHederaHandler(
  conf: IHederaChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  wallet: IEvmWallet,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  return evmHandler({
    blockChunks: conf.blockChunks,
    bridge: conf.contractAddress,
    chainIdent: conf.chain as TSupportedChains,
    currency: conf.nativeCoinSymbol,
    decimals: conf.decimals,
    em: em.fork(),
    initialFunds: BigInt(conf.intialFund),
    lastBlock_: lb?.lastBlock ?? conf.lastBlock,
    provider: new JsonRpcProvider(conf.rpcURL),
    signer: new Wallet(wallet.privateKey),
    storage,
    txSigner: privateKeyToAccount(wallet.privateKey),
  });
}
export async function configStakingHandler(
  em: EntityManager,
  conf: IStakingConfig,
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
  );
}

export async function configTezosHandler(
  conf: ITezosChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  tezosWallet: ITezosWallet,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const provider = new TezosToolkit(conf.rpcURL);
  const signer = new InMemorySigner(tezosWallet.secretKey);
  return tezosHandler({
    provider,
    signer,
    bridge: conf.contractAddress,
    storage,
    lastBlock_: lb?.lastBlock ?? conf.lastBlock,
    blockChunks: conf.blockChunks,
    restApiUrl: conf.restApiURL,
    initialFunds: BigInt(conf.intialFund),
    em: em.fork(),
    decimals: conf.decimals,
  });
}

export async function configCosmWasmChainHandler(
  conf: ICosmWasmChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  cosmWasmWallet: CosmWasmWallet,
) {
  const directWallet = await DirectSecp256k1Wallet.fromKey(
    Buffer.from(cosmWasmWallet.privateKey, "hex"),
    conf.walletPrefix,
  );
  const client = await SigningCosmWasmClient.connectWithSigner(
    conf.rpcURL,
    directWallet,
  );
  return cosmWasmHandler({
    chainIdent: conf.chain as TSupportedChains,
    blockChunks: conf.blockChunks,
    bridge: conf.contractAddress,
    client: client,
    currency: conf.nativeCoinSymbol,
    decimals: conf.decimals,
    em: em.fork(),
    initialFunds: BigInt(conf.intialFund),
    lastBlock_: conf.lastBlock,
    privateKey: cosmWasmWallet.privateKey,
    publicKey: cosmWasmWallet.publicKey,
    storage: storage,
    wallet: directWallet,
  });
}

export async function configSecretHandler(
  conf: ISecretChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  secretWallet: ISecretWallet,
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
  return secretsHandler({
    client,
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
  });
}

export async function configMultiversXHandler(
  conf: IMultiversXChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  multiversXWallet: IMultiversXWallet,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const provider = new ProxyNetworkProvider(conf.gatewayURL);
  return multiversxHandler({
    provider,
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
    decimals: conf.decimals,
  });
}

export async function configTonHandler(
  conf: ITonChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  tonWallet: ITonWallet,
) {
  const client = new TonClient({
    endpoint: conf.rpcURL,
    apiKey: process.env.TON_API_KEY,
  });
  const signer = WalletContractV4.create({
    publicKey: Buffer.from(tonWallet.publicKey, "hex"),
    workchain: 0,
  });
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  return tonHandler({
    client,
    provider: new TonWeb.HttpProvider(conf.rpcURL),
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
  });
}

export async function configDeps(
  config: IBridgeConfig,
  secrets: IGeneratedWallets,
) {
  const storageProvider = new JsonRpcProvider(config.storageConfig.rpcURL);
  const storage = BridgeStorage__factory.connect(
    config.storageConfig.contractAddress,
    new NonceManager(new Wallet(secrets.evmWallet.privateKey, storageProvider)),
  );
  const orm = await MikroORM.init(MikroOrmConfig);
  await orm.schema.updateSchema();
  const em = orm.em;
  return {
    storage,
    em,
    staking: await configStakingHandler(em.fork(), config.stakingConfig),
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
            );
          }),
      )),
      await configTezosHandler(
        (config.bridgeChains.find(
          (e) => e.chainType === "tezos",
        ) as ITezosChainConfig) ?? raise("No Tezos Config Found"),
        storage,
        em.fork(),
        secrets.tezosWallet,
      ),
      await configSecretHandler(
        (config.bridgeChains.find(
          (e) => e.chainType === "scrt",
        ) as ISecretChainConfig) ?? raise("No Secret Config Found"),
        storage,
        em.fork(),
        secrets.secretWallet,
      ),
      await configMultiversXHandler(
        (config.bridgeChains.find(
          (e) => e.chainType === "multiversX",
        ) as IMultiversXChainConfig) ?? raise("No Secret Config Found"),
        storage,
        em.fork(),
        secrets.multiversXWallet,
      ),
      await configTonHandler(
        (config.bridgeChains.find(
          (e) => e.chainType === "ton",
        ) as ITonChainConfig) ?? raise("No Secret Config Found"),
        storage,
        em.fork(),
        secrets.tonWallet,
      ),
    ],
  };
}
