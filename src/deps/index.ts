import { MikroORM } from "@mikro-orm/core";
import { Mutex } from "async-mutex";
import axios from "axios";
import { NonceManager } from "ethers";
import {
  BridgeStorage__factory,
  ERC20Staking__factory,
} from "../contractsTypes/evm";
import {
  configAptosHandler,
  configCosmWasmChainHandler,
  configEvmHandler,
  configHederaHandler,
  configIcpHandler,
  configMultiversXHandler,
  configNearHandler,
  configSecretHandler,
  configStakingHandler,
  configTezosHandler,
  configTonHandler,
} from "../handler/chains";
import { configCasperHandler } from "../handler/chains/casper";
import { configVechainHandler } from "../handler/chains/evm/config-vechain";
import type { LogInstance, THandler } from "../handler/types";
import MikroOrmConfig from "../mikro-orm.config";
import type { IBridgeConfig, IGeneratedWallets } from "../types";
import { initializeEvmProviderAndWallet } from "./init-evm-provider-wallet";
// import { runMigrationsIfAny } from "./run-migrations-if-any";

export async function configDeps(
  config: IBridgeConfig,
  secrets: IGeneratedWallets,
  logger: LogInstance,
) {
  const [storageProvider, storageSigner] = initializeEvmProviderAndWallet(
    config.storageConfig.rpcURL,
    secrets.evmWallet.privateKey,
  );
  const [stakingHandler, stakingSigner] = initializeEvmProviderAndWallet(
    config.stakingConfig.rpcURL,
    secrets.evmWallet.privateKey,
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
    new NonceManager(stakingSigner),
  );
  const orm = await MikroORM.init(MikroOrmConfig);
  // await orm.schema.updateSchema();
  // await runMigrationsIfAny(orm.getMigrator(), logger);
  const em = orm.em;
  const serverLinkHandler = process.env.SERVER_LINK
    ? axios.create({
        baseURL: process.env.SERVER_LINK,
      })
    : undefined;

  function otherArguments(name: string) {
    return [
      storage,
      em.fork(),
      serverLinkHandler,
      logger.getSubLogger({ name }),
      staking,
      secrets.evmWallet.address,
    ] as const;
  }

  const tz = config.bridgeChains.find((e) => e.chainType === "tezos");
  const tzHelper = tz
    ? await configTezosHandler(
        tz,
        secrets.tezosWallet,
        ...otherArguments("TEZOS"),
      )
    : undefined;

  const scrtc = config.bridgeChains.find((e) => e.chainType === "scrt");
  const scrt = scrtc
    ? await configSecretHandler(
        scrtc,
        secrets.secretWallet,
        ...otherArguments("SECRET"),
      )
    : undefined;

  const mxc = config.bridgeChains.find((e) => e.chainType === "multiversX");
  const mx = mxc
    ? await configMultiversXHandler(
        mxc,
        secrets.multiversXWallet,
        ...otherArguments("MULTIVERSX"),
      )
    : undefined;

  const tonc = config.bridgeChains.find((e) => e.chainType === "ton");

  const ton = tonc
    ? await configTonHandler(tonc, secrets.tonWallet, ...otherArguments("TON"))
    : undefined;

  const icpc = config.bridgeChains.find((e) => e.chainType === "icp");

  const icp = icpc
    ? await configIcpHandler(icpc, secrets.icpWallet, ...otherArguments("ICP"))
    : undefined;

  const nearc = config.bridgeChains.find((e) => e.chainType === "near");

  const near = nearc
    ? await configNearHandler(
        nearc,
        secrets.nearWallet,
        ...otherArguments("NEAR"),
      )
    : undefined;

  const aptosc = config.bridgeChains.find((e) => e.chainType === "aptos");

  const aptos = aptosc
    ? await configAptosHandler(
        aptosc,
        secrets.aptosWallet,
        ...otherArguments("APTOS"),
      )
    : undefined;

  const evmChains = await Promise.all(
    config.bridgeChains
      .filter((e) => e.chainType === "evm")
      .map((c) => {
        const config = c;
        return configEvmHandler(
          config,
          secrets.evmWallet,
          ...otherArguments(config.chain),
        );
      }),
  );

  const cosmwasmChains = await Promise.all(
    config.bridgeChains
      .filter((e) => e.chainType === "cosmwasm")
      .map((c) => {
        const config = c;
        return configCosmWasmChainHandler(
          config,
          secrets.secretWallet,
          ...otherArguments(c.chain),
        );
      }),
  );

  const hederaConf = config.bridgeChains.find((e) => e.chainType === "hedera");

  const hedera = hederaConf
    ? await configHederaHandler(
        hederaConf,
        secrets.evmWallet,
        ...otherArguments("HEDERA"),
      )
    : undefined;

  const vechainConf = config.bridgeChains.find(
    (e) => e.chainType === "vechain",
  );

  const vechain = vechainConf
    ? await configVechainHandler(
        vechainConf,
        secrets.evmWallet,
        ...otherArguments("VECHAIN"),
      )
    : undefined;

  const casperConf = config.bridgeChains.find((e) => e.chainType === "casper");

  const casper = casperConf
    ? await configCasperHandler(
        casperConf,
        storage,
        em.fork(),
        secrets.casperWallet,
        serverLinkHandler,
        logger.getSubLogger({ name: "CASPER" }),
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
    stakingHandler,
    stakingSigner,
    staker: staking,
    chains: [
      // Configure Ethereum Virtual Machine (EVM) chains iteratively as they share the same configuration pattern
      ...evmChains,
      ...cosmwasmChains,
      vechain,
      hedera,
      casper,
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
