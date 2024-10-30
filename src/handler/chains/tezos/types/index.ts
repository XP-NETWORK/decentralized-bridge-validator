import type { EntityManager } from "@mikro-orm/sqlite";
import type { Signer, TezosToolkit } from "@taquito/taquito";
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
import type { MutexReleaser } from "../../evm/types";

export type TezosHandlerParams = {
  fetchProvider: () => Promise<[TezosToolkit, MutexReleaser]>;
  signer: Signer;
  bridge: string;
  storage: BridgeStorage;
  lastBlock_: number;
  blockChunks: number;
  restApiUrl: string;
  initialFunds: bigint;
  em: EntityManager;
  chainType: TSupportedChainTypes;
  decimals: number;
  chainIdent: TSupportedChains;
  serverLinkHandler: AxiosInstance | undefined;
  logger: LogInstance;
  staking: ERC20Staking;
  validatorAddress: string;
};

export type TezosProviderFetch = () => Promise<[TezosToolkit, MutexReleaser]>;
