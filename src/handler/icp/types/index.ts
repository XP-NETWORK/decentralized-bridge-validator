import type { HttpAgent } from "@dfinity/agent";
import type { Ed25519KeyIdentity } from "@dfinity/identity";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { AxiosInstance } from "axios";
import type { BridgeStorage } from "xp-decentralized-sdk/dist/contractsTypes/evm";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { LogInstance } from "../../types";

export type ICPHandlerParams = {
  agent: HttpAgent;
  identity: Ed25519KeyIdentity;
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
