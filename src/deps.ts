import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";
import { JsonRpcProvider, Wallet } from "ethers";
import secrets from "../secrets.json";
import { TSupportedChains } from "./config";
import { BridgeStorage, BridgeStorage__factory } from "./contractsTypes/evm";
import { evmHandler } from "./handler/evm";
import { tezosHandler } from "./handler/tezos";
import { raise } from "./handler/ton";
import { TWallet } from "./handler/types";
import { IBridgeConfig, IEvmChainConfig, ITezosChainConfig } from "./types";

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
    },
  };
}
