import type { EntityManager } from "@mikro-orm/sqlite";
import { Mutex } from "async-mutex";
import type { AxiosInstance } from "axios";
import { JsonRpcProvider, Wallet } from "ethers";
import { privateKeyToAccount } from "web3-eth-accounts";
import { evmHandler } from ".";
import type { TSupportedChainTypes, TSupportedChains } from "../../config";
import type { BridgeStorage, ERC20Staking } from "../../contractsTypes/evm";
import { Block } from "../../persistence/entities/block";
import type { IEvmChainConfig, IEvmWallet } from "../../types";
import type { LogInstance } from "../types";
import type { MutexReleaser } from "./types";

export async function configEvmHandler(
  conf: IEvmChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  wallet: IEvmWallet,
  serverLinkHandler: AxiosInstance | undefined,
  evmLogger: LogInstance,
  staking: ERC20Staking,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const mutex = new Mutex();
  const provider = new JsonRpcProvider(conf.rpcURL);
  const fetchProvider = async (): Promise<[JsonRpcProvider, MutexReleaser]> => {
    const release = await mutex.acquire();
    return [provider, release];
  };
  return evmHandler({
    blockChunks: conf.blockChunks,
    bridge: conf.contractAddress,
    chainIdent: conf.chain as TSupportedChains,
    currency: conf.nativeCoinSymbol,
    decimals: conf.decimals,
    em: em.fork(),
    initialFunds: BigInt(conf.intialFund),
    lastBlock_: lb?.lastBlock ?? conf.lastBlock,
    fetchProvider: fetchProvider,
    signer: new Wallet(wallet.privateKey),
    storage,
    txSigner: privateKeyToAccount(wallet.privateKey),
    royaltyProxy: undefined,
    chainType: conf.chainType as TSupportedChainTypes,
    serverLinkHandler,
    logger: evmLogger,
    staking,
  });
}
