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
import { TWallet } from "./handler/types";
import {
  IBridgeConfig,
  IEvmChainConfig,
  IMultiversXChainConfig,
  ISecretChainConfig,
  ITezosChainConfig,
  ITonChainConfig,
} from "./types";

export function configEvmHandler(
  chainIdent: TSupportedChains,
  rpc: string,
  wallet: TWallet,
  bridge: string,
  storage: BridgeStorage,
  lastBlock: bigint,
) {
  return evmHandler(
    chainIdent,
    new JsonRpcProvider(rpc),
    new Wallet(wallet.pk),
    bridge,
    storage,
    lastBlock,
    1000,
  );
}

export async function configTezosHandler(
  conf: ITezosChainConfig,
  storage: BridgeStorage,
) {
  const Tezos = new TezosToolkit(conf.rpcURL);
  const im = new InMemorySigner(secrets.tezosWallet.secretKey);
  return tezosHandler(
    Tezos,
    im,
    conf.contractAddress,
    storage,
    BigInt(conf.lastBlock),
    1000,
    conf.restApiURL,
  );
}

export async function configSecretHandler(
  conf: ISecretChainConfig,
  storage: BridgeStorage,
) {
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
    BigInt(conf.lastBlock),
    1000,
  );
}

export async function configMultiversXHandler(
  conf: IMultiversXChainConfig,
  storage: BridgeStorage,
) {
  const provider = new ProxyNetworkProvider(conf.gatewayURL);
  return multiversxHandler(
    provider,
    conf.gatewayURL,
    UserSigner.fromPem(secrets.multiversXWallet.privateKey),
    conf.chainID,
    conf.contractAddress,
    storage,
    BigInt(conf.lastBlock),
  );
}

export async function configTonHandler(
  conf: ITonChainConfig,
  storage: BridgeStorage,
) {
  const TC = new TonClient({
    endpoint: conf.rpcURL,
    apiKey: "f3f6ef64352ac53cdfca18a3ba5372983e4037182c2b510fc52de5a259ecf292",
  });
  const wallet = WalletContractV4.create({
    publicKey: Buffer.from(secrets.tonWallet.publicKey, "hex"),
    workchain: 0,
  });
  return tonHandler(
    TC,
    new TonWeb.HttpProvider(conf.rpcURL),
    wallet,
    conf.contractAddress,
    storage,
    BigInt(conf.lastBlock),
    TC.open(wallet).sender(Buffer.from(secrets.tonWallet.secretKey, "hex")),
    secrets.tonWallet.secretKey,
  );
}

export async function configDeps(config: IBridgeConfig) {
  const storageProvider = new JsonRpcProvider(config.storageConfig.rpcURL);
  const storage = BridgeStorage__factory.connect(
    config.storageConfig.contractAddress,
    new Wallet(secrets.evmWallet.pk, storageProvider),
  );
  return {
    storage,
    chains: {
      evm: config.bridgeChains
        .filter((e) => e.chainType === "evm")
        .map((c) => {
          const config = c as IEvmChainConfig;
          return configEvmHandler(
            config.chain as TSupportedChains,
            config.rpcURL,
            secrets.evmWallet,
            config.contractAddress,
            storage,
            BigInt(config.lastBlock),
          );
        }),
      tezos: await configTezosHandler(
        (config.bridgeChains.find(
          (e) => e.chainType === "tezos",
        ) as ITezosChainConfig) ?? raise("No Tezos Config Found"),
        storage,
      ),
      secret: await configSecretHandler(
        (config.bridgeChains.find(
          (e) => e.chainType === "scrt",
        ) as ISecretChainConfig) ?? raise("No Secret Config Found"),
        storage,
      ),
      multiversx: await configMultiversXHandler(
        (config.bridgeChains.find(
          (e) => e.chainType === "multiversX",
        ) as IMultiversXChainConfig) ?? raise("No Secret Config Found"),
        storage,
      ),
      ton: await configTonHandler(
        (config.bridgeChains.find(
          (e) => e.chainType === "ton",
        ) as ITonChainConfig) ?? raise("No Secret Config Found"),
        storage,
      ),
    },
  };
}
