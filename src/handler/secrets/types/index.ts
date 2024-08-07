import type { EntityManager } from "@mikro-orm/sqlite";
import type { AxiosInstance } from "axios";
import type { SecretNetworkClient, Wallet } from "secretjs";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { BridgeStorage } from "../../../contractsTypes/evm";
import type { LogInstance } from "../../types";

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
  serverLinkHandler: AxiosInstance | undefined;
  logger: LogInstance;
};
