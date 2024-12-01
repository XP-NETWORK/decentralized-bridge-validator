import type { EntityManager } from "@mikro-orm/sqlite";
import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";
import { Mutex } from "async-mutex";
import type { AxiosInstance } from "axios";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import { Block } from "../../../persistence/entities/block";
import type { ITezosChainConfig, ITezosWallet } from "../../../types";
import type { LogInstance } from "../../types";
import type { MutexReleaser } from "../evm/types";
import { tezosHandler } from "./handler";

export async function configTezosHandler(
  conf: ITezosChainConfig,
  tezosWallet: ITezosWallet,
  storage: BridgeStorage,
  em: EntityManager,
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
