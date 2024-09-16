import type { EntityManager } from "@mikro-orm/sqlite";
import type { AxiosInstance } from "axios";
import type { InMemorySigner, Near } from "near-api-js";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import type { LogInstance } from "../../types";

export type NearHandlerParams = {
  near: Near;
  signer: InMemorySigner;
  bridge: string;
  address: string;
  networkId: string;
  privateKey: string;
  storage: BridgeStorage;
  lastBlock_: number;
  nearBlocksUrl: string;
  nearBlocksApiKey: string;
  initialFunds: bigint;
  em: EntityManager;
  decimals: number;
  chainType: TSupportedChainTypes;
  chainIdent: TSupportedChains;
  serverLinkHandler: AxiosInstance | undefined;
  logger: LogInstance;
  staking: ERC20Staking;
  validatorAddress: string;
};
