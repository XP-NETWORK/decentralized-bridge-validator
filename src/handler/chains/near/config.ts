import type { EntityManager } from "@mikro-orm/sqlite";
import { Mutex } from "async-mutex";
import type { AxiosInstance } from "axios";
import {
  InMemorySigner,
  KeyPair,
  type Near,
  connect,
  keyStores,
} from "near-api-js";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import { Block } from "../../../persistence/entities/block";
import type { INearChainConfig, INearWallet } from "../../../types";
import type { LogInstance } from "../../types";
import type { MutexReleaser } from "../evm/types";
import { nearHandler } from "./handler";

export async function configNearHandler(
  conf: INearChainConfig,
  nearWallet: INearWallet,
  storage: BridgeStorage,
  em: EntityManager,
  serverLinkHandler: AxiosInstance | undefined,
  nearLogger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
) {
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
  const near = await connect({
    networkId: conf.networkId,
    nodeUrl: conf.rpcURL,
    keyStore: ks,
  });
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
    signer: new InMemorySigner(ks),
    theGraphApiUrl: conf.theGraphApiUrl,
    serverLinkHandler: serverLinkHandler,
    validatorAddress,
    staking,
  });
}
