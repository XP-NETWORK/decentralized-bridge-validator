import { HttpAgent } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import type { EntityManager } from "@mikro-orm/sqlite";
import { Mutex } from "async-mutex";
import type { AxiosInstance } from "axios";
import { icpHandler } from ".";
import type { BridgeStorage, ERC20Staking } from "../../contractsTypes/evm";
import { Block } from "../../persistence/entities/block";
import type { IICPChainConfig, IICPWallet } from "../../types";
import type { MutexReleaser } from "../evm/types";
import type { LogInstance, THandler } from "../types";

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
