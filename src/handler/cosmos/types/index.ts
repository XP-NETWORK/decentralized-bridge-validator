import type { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import type { DirectSecp256k1Wallet } from "@cosmjs/proto-signing";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { AxiosInstance } from "axios";
import type { BridgeStorage } from "xp-decentralized-sdk/dist/contractsTypes/evm";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { LogInstance } from "../../types";

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
  chainType: TSupportedChainTypes;
  serverLinkHandler: AxiosInstance | undefined;
  logger: LogInstance;
};
