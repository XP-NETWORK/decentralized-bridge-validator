import type { EntityManager } from "@mikro-orm/sqlite";
import type { AxiosInstance } from "axios";
import type { JsonRpcProvider, Wallet } from "ethers";
import type { Web3Account } from "web3-eth-accounts";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { BridgeStorage } from "../../../contractsTypes/evm";
import type { LogInstance } from "../../types";

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
