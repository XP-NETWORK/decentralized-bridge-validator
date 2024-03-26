import { Secp256k1Wallet } from "@cosmjs/amino";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { EntityManager } from "@mikro-orm/sqlite";
import { BridgeStorage } from "xp-decentralized-sdk/dist/contractsTypes/evm";

export type CosmosHandlerParams = {
  client: SigningCosmWasmClient;
  wallet: Secp256k1Wallet;
  publicKey: string;
  privateKey: string;
  bridge: string;
  storage: BridgeStorage;
  lastBlock_: number;
  blockChunks: number;
  initialFunds: bigint;
  em: EntityManager;
  decimals: number;
};
