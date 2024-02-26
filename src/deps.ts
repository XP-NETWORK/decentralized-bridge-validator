import { MikroORM } from "@mikro-orm/core";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers/out";
import { UserSigner } from "@multiversx/sdk-wallet/out";
import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";
import { TonClient, WalletContractV4 } from "@ton/ton";
import { JsonRpcProvider, Wallet } from "ethers";
import { SecretNetworkClient, Wallet as SecretWallet } from "secretjs";
import TonWeb from "tonweb";
import secrets from "../secrets.json";
import { TSupportedChains } from "./config";
import { BridgeStorage, BridgeStorage__factory } from "./contractsTypes/evm";
import { evmHandler } from "./handler/evm";
import { multiversxHandler } from "./handler/multiversx";
import { secretsHandler } from "./handler/secrets";
import { tezosHandler } from "./handler/tezos";
import { raise, tonHandler } from "./handler/ton";

import { EntityManager } from "@mikro-orm/sqlite";
import MikroOrmConfig from "./mikro-orm.config";
import { Block } from "./persistence/entities/block";
import {
  IBridgeConfig,
  IEvmChainConfig,
  IMultiversXChainConfig,
  ISecretChainConfig,
  ITezosChainConfig,
  ITonChainConfig,
} from "./types";

export async function configEvmHandler(
  conf: IEvmChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  return evmHandler(
    conf.chain as TSupportedChains,
    new JsonRpcProvider(conf.rpcURL),
    new Wallet(secrets.evmWallet.privateKey),
    conf.contractAddress,
    storage,
    lb?.lastBlock ?? conf.lastBlock,
    1000,
    BigInt(conf.intialFund),
    conf.nativeCoinSymbol,
    em.fork(),
  );
}

export async function configTezosHandler(
  conf: ITezosChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const Tezos = new TezosToolkit(conf.rpcURL);
  const im = new InMemorySigner(secrets.tezosWallet.secretKey);
  return tezosHandler(
    Tezos,
    im,
    conf.contractAddress,
    storage,
    lb?.lastBlock ?? conf.lastBlock,
    1000,
    conf.restApiURL,
    BigInt(conf.intialFund),
    em.fork(),
  );
}

export async function configSecretHandler(
  conf: ISecretChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const wallet = new SecretWallet(secrets.secretWallet.privateKey);
  const client = new SecretNetworkClient({
    chainId: conf.chainId,
    url: conf.rpcURL,
    wallet: wallet,
    walletAddress: wallet.address,
  });
  return secretsHandler(
    client,
    wallet,
    secrets.secretWallet.publicKey,
    conf.contractAddress,
    (
      await client.query.compute.codeHashByContractAddress({
        contract_address: conf.contractAddress,
      })
    ).code_hash ?? raise("Failed to get Code Hash"),
    storage,
    lb?.lastBlock ?? conf.lastBlock,
    1000,
    BigInt(conf.intialFund),
    em.fork(),
  );
}

export async function configMultiversXHandler(
  conf: IMultiversXChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const provider = new ProxyNetworkProvider(conf.gatewayURL);
  return multiversxHandler(
    provider,
    conf.gatewayURL,
    UserSigner.fromWallet(
      secrets.multiversXWallet.userWallet,
      secrets.multiversXWallet.password,
    ),
    conf.chainID,
    conf.contractAddress,
    storage,
    lb?.lastBlock ?? conf.lastBlock,
    BigInt(conf.intialFund),
    em.fork(),
  );
}

export async function configTonHandler(
  conf: ITonChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
) {
  const TC = new TonClient({
    endpoint: conf.rpcURL,
    apiKey: "f3f6ef64352ac53cdfca18a3ba5372983e4037182c2b510fc52de5a259ecf292",
  });
  const wallet = WalletContractV4.create({
    publicKey: Buffer.from(secrets.tonWallet.publicKey, "hex"),
    workchain: 0,
  });
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  return tonHandler(
    TC,
    new TonWeb.HttpProvider(conf.rpcURL),
    wallet,
    conf.contractAddress,
    storage,
    lb?.lastBlock ?? conf.lastBlock,
    TC.open(wallet).sender(Buffer.from(secrets.tonWallet.secretKey, "hex")),
    secrets.tonWallet.secretKey,
    BigInt(conf.intialFund),
    em.fork(),
  );
}

export async function configDeps(config: IBridgeConfig) {
  const storageProvider = new JsonRpcProvider(config.storageConfig.rpcURL);
  const storage = BridgeStorage__factory.connect(
    config.storageConfig.contractAddress,
    new Wallet(secrets.evmWallet.privateKey, storageProvider),
  );
  const orm = await MikroORM.init(MikroOrmConfig);
  await orm.schema.updateSchema();
  const em = orm.em;
  return {
    storage,
    em,
    chains: [
      // Configure Ethereum Virtual Machine (EVM) chains iteratively as they share the same configuration pattern
      ...(await Promise.all(
        config.bridgeChains
          .filter((e) => e.chainType === "evm")
          .map((c) => {
            const config = c as IEvmChainConfig;
            return configEvmHandler(config, storage, em.fork());
          }),
      )),
      await configTezosHandler(
        (config.bridgeChains.find(
          (e) => e.chainType === "tezos",
        ) as ITezosChainConfig) ?? raise("No Tezos Config Found"),
        storage,
        em.fork(),
      ),
      await configSecretHandler(
        (config.bridgeChains.find(
          (e) => e.chainType === "scrt",
        ) as ISecretChainConfig) ?? raise("No Secret Config Found"),
        storage,
        em.fork(),
      ),
      await configMultiversXHandler(
        (config.bridgeChains.find(
          (e) => e.chainType === "multiversX",
        ) as IMultiversXChainConfig) ?? raise("No Secret Config Found"),
        storage,
        em.fork(),
      ),
      await configTonHandler(
        (config.bridgeChains.find(
          (e) => e.chainType === "ton",
        ) as ITonChainConfig) ?? raise("No Secret Config Found"),
        storage,
        em.fork(),
      ),
    ],
  };
}
