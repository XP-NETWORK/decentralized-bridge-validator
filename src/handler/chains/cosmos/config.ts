import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1Wallet } from "@cosmjs/proto-signing";
import type { EntityManager } from "@mikro-orm/sqlite";
import { Mutex } from "async-mutex";
import type { AxiosInstance } from "axios";
import { cosmWasmHandler } from ".";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { BridgeStorage } from "../../../contractsTypes/evm";
import type { CosmWasmWallet, ICosmWasmChainConfig } from "../../../types";
import type { LogInstance } from "../../types";
import type { MutexReleaser } from "../evm/types";

export async function configCosmWasmChainHandler(
  conf: ICosmWasmChainConfig,
  storage: BridgeStorage,
  em: EntityManager,
  cosmWasmWallet: CosmWasmWallet,
  serverLinkHandler: AxiosInstance | undefined,
  cwLogger: LogInstance,
) {
  const directWallet = await DirectSecp256k1Wallet.fromKey(
    Buffer.from(cosmWasmWallet.privateKey, "hex"),
    conf.walletPrefix,
  );
  const client = await SigningCosmWasmClient.connectWithSigner(
    conf.rpcURL,
    directWallet,
  );
  const mutex = new Mutex();
  async function fetchProvider() {
    const release = await mutex.acquire();
    return [client, release] as [SigningCosmWasmClient, MutexReleaser];
  }
  return cosmWasmHandler({
    chainIdent: conf.chain as TSupportedChains,
    blockChunks: conf.blockChunks,
    bridge: conf.contractAddress,
    fetchProvider,
    currency: conf.nativeCoinSymbol,
    decimals: conf.decimals,
    em: em.fork(),
    initialFunds: BigInt(conf.intialFund),
    lastBlock_: conf.lastBlock,
    privateKey: cosmWasmWallet.privateKey,
    publicKey: cosmWasmWallet.publicKey,
    storage: storage,
    wallet: directWallet,
    chainType: conf.chainType as TSupportedChainTypes,
    serverLinkHandler,
    logger: cwLogger,
  });
}
