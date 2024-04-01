import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1Wallet } from "@cosmjs/proto-signing";
import { EntityManager } from "@mikro-orm/sqlite";
import { BridgeStorage } from "xp-decentralized-sdk/dist/contractsTypes/evm";
import { TSupportedChains } from "../../../config";

export type CosmosHandlerParams = {
  chainIdent: TSupportedChains;
  client: SigningCosmWasmClient;
  wallet: DirectSecp256k1Wallet;
  publicKey: string;
  privateKey: string;
  bridge: string;
  storage: BridgeStorage;
  lastBlock_: number;
  blockChunks: number;
  initialFunds: bigint;
  em: EntityManager;
  currency: string;
  decimals: number;
};
