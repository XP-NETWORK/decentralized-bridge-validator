import {
  Aptos,
  AptosConfig,
  Ed25519Account,
  Ed25519PrivateKey,
} from "@aptos-labs/ts-sdk";
import type { EntityManager } from "@mikro-orm/sqlite";
import { Mutex } from "async-mutex";
import type { AxiosInstance } from "axios";
import { aptosHandler } from ".";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import { Block } from "../../../persistence/entities/block";
import type { IAptosChainConfig, IAptosWallet } from "../../../types";
import type { LogInstance } from "../../types";

export async function configAptosHandler(
  conf: IAptosChainConfig,
  aptosWallet: IAptosWallet,
  storage: BridgeStorage,
  em: EntityManager,
  serverLinkHandler: AxiosInstance | undefined,
  aptosLogger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
) {
  const cfg = new AptosConfig({
    network: conf.network,
  });
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const signer = new Ed25519Account({
    privateKey: new Ed25519PrivateKey(aptosWallet.privateKey),
    address: aptosWallet.address,
  });
  const aptos = new Aptos(cfg);
  const mutex = new Mutex();
  async function fetchProvider() {
    const release = await mutex.acquire();
    return [aptos, release] as const;
  }

  return aptosHandler({
    fetchProvider: fetchProvider,
    bridge: conf.contractAddress,
    chainIdent: "APTOS",
    chainType: "aptos",
    decimals: 8,
    em,
    initialFunds: 10000000n,
    lastBlock_: lb?.lastBlock || conf.lastBlock,
    logger: aptosLogger,
    serverLinkHandler,
    signer,
    staking,
    storage,
    validatorAddress,
  });
}
