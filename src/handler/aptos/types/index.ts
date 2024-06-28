import { Account, Aptos } from "@aptos-labs/ts-sdk";
import { EntityManager } from "@mikro-orm/sqlite";
import { BridgeStorage } from "xp-decentralized-sdk/dist/contractsTypes/evm";
import { TSupportedChainTypes, TSupportedChains } from "../../../config";

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
};
