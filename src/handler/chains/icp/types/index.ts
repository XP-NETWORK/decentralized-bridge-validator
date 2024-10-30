import type { HttpAgent } from "@dfinity/agent";
import type { Ed25519KeyIdentity } from "@dfinity/identity";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { AxiosInstance } from "axios";
import type {
  TSupportedChainTypes,
  TSupportedChains,
} from "../../../../config";
import type {
  BridgeStorage,
  ERC20Staking,
} from "../../../../contractsTypes/evm";
import type { LogInstance } from "../../../types";

export type ICPHandlerParams = {
  fetchProvider: ICPProviderFetch;
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
  staking: ERC20Staking;
  validatorAddress: string;
};

export type ICPProviderFetch = () => Promise<[HttpAgent, () => void]>;
