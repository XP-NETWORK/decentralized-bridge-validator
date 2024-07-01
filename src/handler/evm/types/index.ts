import { EntityManager } from "@mikro-orm/sqlite";
import { AxiosInstance } from "axios";
import { JsonRpcProvider, Wallet } from "ethers";
import { Web3Account } from "web3-eth-accounts";
import { TSupportedChainTypes, TSupportedChains } from "../../../config";
import { BridgeStorage } from "../../../contractsTypes/evm";
import { LogInstance } from "../../types";

export type EVMHandlerParams = {
  chainIdent: TSupportedChains;
  provider: JsonRpcProvider;
  signer: Wallet;
  bridge: string;
  storage: BridgeStorage;
  lastBlock_: number;
  blockChunks: number;
  initialFunds: bigint;
  currency: string;
  em: EntityManager;
  txSigner: Web3Account;
  decimals: number;
  royaltyProxy: string | undefined;
  chainType: TSupportedChainTypes;
  serverLinkHandler: AxiosInstance | undefined;
  logger: LogInstance;
};
