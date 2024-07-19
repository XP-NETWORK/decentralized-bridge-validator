import type { Account, Aptos } from "@aptos-labs/ts-sdk";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { AxiosInstance } from "axios";
import type { BridgeStorage } from "xp-decentralized-sdk/dist/contractsTypes/evm";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { LogInstance } from "../../types";

export type AptosHandlerParams = {
  client: Aptos;
  account: Account;
  publicKey: string;
  privateKey: string;
  bridge: string;
  storage: BridgeStorage;
  lastBlock_: number;
  initialFunds: bigint;
  em: EntityManager;
  decimals: number;
  chainType: TSupportedChainTypes;
  chainIdent: TSupportedChains;
  serverLinkHandler: AxiosInstance | undefined;
  logger: LogInstance;
};
