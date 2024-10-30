import type { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import type { DirectSecp256k1Wallet } from "@cosmjs/proto-signing";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { AxiosInstance } from "axios";
import type {
  TSupportedChainTypes,
  TSupportedChains,
} from "../../../../config";
import type { BridgeStorage } from "../../../../contractsTypes/evm";
import type { LogInstance } from "../../../types";
import type { MutexReleaser } from "../../evm/types";

export type CosmosHandlerParams = {
  chainIdent: TSupportedChains;
  fetchProvider: CosmWasmFetchProvider;
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

export type CosmWasmFetchProvider = () => Promise<
  [SigningCosmWasmClient, MutexReleaser]
>;
