import { EntityManager } from "@mikro-orm/sqlite";
import { SecretNetworkClient, Wallet } from "secretjs";
import { BridgeStorage } from "xp-decentralized-sdk/dist/contractsTypes/evm";
import { TSupportedChainTypes, TSupportedChains } from "../../../config";

export type SecretsHandlerParams = {
  client: SecretNetworkClient;
  wallet: Wallet;
  publicKey: string;
  privateKey: string;
  bridge: string;
  bridgeCodeHash: string;
  storage: BridgeStorage;
  lastBlock_: number;
  blockChunks: number;
  initialFunds: bigint;
  em: EntityManager;
  decimals: number;
  chainType: TSupportedChainTypes;
  chainIdent: TSupportedChains;
};
