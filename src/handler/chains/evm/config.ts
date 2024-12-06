import type { EntityManager } from "@mikro-orm/sqlite";
import { Driver, SimpleNet } from "@vechain/connex-driver";
import { Framework } from "@vechain/connex-framework";
import { Mutex } from "async-mutex";
import type { AxiosInstance } from "axios";
import { BrowserProvider, JsonRpcProvider, Wallet } from "ethers";
import { privateKeyToAccount } from "web3-eth-accounts";
import * as thor from "web3-providers-connex";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import { Block } from "../../../persistence/entities/block";
import type { IEvmChainConfig, IEvmWallet } from "../../../types";
import type { LogInstance } from "../../types";
import { evmHandler } from "./handler";
import type { MutexReleaser } from "./types";

export async function configEvmHandler(
  conf: IEvmChainConfig,
  wallet: IEvmWallet,
  storage: BridgeStorage,
  em: EntityManager,
  serverLinkHandler: AxiosInstance | undefined,
  evmLogger: LogInstance,
  staking: ERC20Staking,
  _validatorAddress: string,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  const mutex = new Mutex();
  let provider: JsonRpcProvider | BrowserProvider;
  if (conf.chain === "VECHAIN") {
    const net = new SimpleNet(conf.rpcURL);
    const driver = await Driver.connect(net);
    const connexObj = new Framework(driver);
    provider = new BrowserProvider(
      new thor.ConnexProvider({
        connex: connexObj,
      }),
    );
  } else {
    provider = new JsonRpcProvider(conf.rpcURL);
  }
  const fetchProvider = async (): Promise<
    [JsonRpcProvider | BrowserProvider, MutexReleaser]
  > => {
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
