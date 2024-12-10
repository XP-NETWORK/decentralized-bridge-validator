import type { EntityManager } from "@mikro-orm/sqlite";
import { Driver, SimpleNet, SimpleWallet } from "@vechain/connex-driver";
import { Framework } from "@vechain/connex-framework";
import * as thor from "@vechain/web3-providers-connex";
import { Mutex } from "async-mutex";
import type { AxiosInstance } from "axios";
import { BrowserProvider, Wallet } from "ethers";
import { privateKeyToAccount } from "web3-eth-accounts";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import { Block } from "../../../persistence/entities/block";
import type { IEvmWallet, IVeChainConfig } from "../../../types";
import type { LogInstance } from "../../types";
import { evmHandler } from "./handler";

export async function configVechainHandler(
  conf: IVeChainConfig,
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
  const net = new SimpleNet(conf.rpcURL);
  const simpleWalletObj = new SimpleWallet();
  simpleWalletObj.import(wallet.privateKey);
  const driver = await Driver.connect(net, simpleWalletObj);
  const connexObj = new Framework(driver);
  const provider = thor.ethers.modifyProvider(
    new BrowserProvider(
      new thor.Provider({
        connex: connexObj,
        net,
        wallet: simpleWalletObj,
      }),
    ),
  );
  const fetchProvider = async () => {
    const release = await mutex.acquire();
    return [provider, release] as const;
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
    fetchProvider: fetchProvider as never,
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
