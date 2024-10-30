import { MikroORM } from "@mikro-orm/core";
import { Mutex } from "async-mutex";
import axios from "axios";
import { JsonRpcProvider, NonceManager, Wallet } from "ethers";
import {
  BridgeStorage__factory,
  ERC20Staking__factory,
} from "./contractsTypes/evm";
import { configAptosHandler } from "./handler/aptos/config";
import { configCosmWasmChainHandler } from "./handler/cosmos/config";
import { configEvmHandler } from "./handler/evm/config";
import { configHederaHandler } from "./handler/evm/config-hedera";
import { configStakingHandler } from "./handler/evm/config-staking";
import { configIcpHandler } from "./handler/icp/config";
import { configMultiversXHandler } from "./handler/multiversx/config";
import { configNearHandler } from "./handler/near/config";
import { configSecretHandler } from "./handler/secrets/config";
import { configTezosHandler } from "./handler/tezos/config";
import { configTonHandler } from "./handler/ton/config";
import type { LogInstance, THandler } from "./handler/types";
import MikroOrmConfig from "./mikro-orm.config";
import type {
  IBridgeConfig,
  ICosmWasmChainConfig,
  IEvmChainConfig,
  IGeneratedWallets,
  IMultiversXChainConfig,
  ISecretChainConfig,
  ITezosChainConfig,
  ITonChainConfig,
} from "./types";

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
        staking,
        secrets.evmWallet.address,
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
        staking,
        secrets.evmWallet.address,
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

  const aptosc = config.bridgeChains.find((e) => e.chainType === "aptos");

  const aptos = aptosc
    ? await configAptosHandler(
        aptosc,
        storage,
        em.fork(),
        secrets.aptosWallet,
        serverLinkHandler,
        logger.getSubLogger({ name: "APTOS" }),
        staking,
        secrets.evmWallet.address,
      )
    : undefined;

  const evmChains = await Promise.all(
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
  );

  const cosmwasmChains = await Promise.all(
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
  );

  const hederaConf = config.bridgeChains.find((e) => e.chainType === "hedera");

  const hedera = hederaConf
    ? await configHederaHandler(
        hederaConf,
        storage,
        em.fork(),
        secrets.evmWallet,
        serverLinkHandler,
        logger.getSubLogger({ name: "HEDERA" }),
        staking,
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
      ...evmChains,
      ...cosmwasmChains,
      hedera,
      tzHelper,
      scrt,
      mx,
      ton,
      icp,
      near,
      aptos,
    ].filter((e) => e !== undefined) as THandler[],
  };
}
