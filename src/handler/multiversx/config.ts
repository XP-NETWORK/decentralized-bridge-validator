import type { EntityManager } from "@mikro-orm/sqlite";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers/out";
import { UserSigner } from "@multiversx/sdk-wallet/out";
import { Mutex } from "async-mutex";
import type { AxiosInstance } from "axios";
import { multiversxHandler } from ".";
import type { TSupportedChainTypes, TSupportedChains } from "../../config";
import type { BridgeStorage, ERC20Staking } from "../../contractsTypes/evm";
import { Block } from "../../persistence/entities/block";
import type { IMultiversXChainConfig, IMultiversXWallet } from "../../types";
import type { MutexReleaser } from "../evm/types";
import type { LogInstance } from "../types";

export async function configMultiversXHandler(
  conf: IMultiversXChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  multiversXWallet: IMultiversXWallet,
  serverLinkHandler: AxiosInstance | undefined,
  mxLogger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const provider = new ProxyNetworkProvider(conf.gatewayURL);
  const mutex = new Mutex();
  async function fetchProvider() {
    const release = await mutex.acquire();
    return [provider, release] as [ProxyNetworkProvider, MutexReleaser];
  }
  return multiversxHandler({
    provider: fetchProvider,
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
    chainIdent: conf.chain as TSupportedChains,
    chainType: conf.chainType as TSupportedChainTypes,
    decimals: conf.decimals,
    serverLinkHandler,
    logger: mxLogger,
    staking,
    validatorAddress,
  });
}
