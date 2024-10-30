import type { EntityManager } from "@mikro-orm/sqlite";
import type { AxiosInstance } from "axios";
import type { SecretNetworkClient, Wallet } from "secretjs";
import type {
  TSupportedChainTypes,
  TSupportedChains,
} from "../../../../config";
import type {
  BridgeStorage,
  ERC20Staking,
} from "../../../../contractsTypes/evm";
import type { LogInstance } from "../../../types";

export type SecretsHandlerParams = {
  fetchProvider: SecretProviderFetch;
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
  staking: ERC20Staking;
  validatorAddress: string;
};

export type SecretProviderFetch = () => Promise<
  [SecretNetworkClient, () => void]
>;
