import type { EntityManager } from "@mikro-orm/sqlite";
import type { ProxyNetworkProvider } from "@multiversx/sdk-network-providers/out";
import type { UserSigner } from "@multiversx/sdk-wallet/out";
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

export type MultiversXHandlerParams = {
  provider: MXProviderFetch;
  gatewayURL: string;
  signer: UserSigner;
  chainID: string;
  bridge: string;
  storage: BridgeStorage;
  lastBlock: number;
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

export type MXProviderFetch = () => Promise<
  [ProxyNetworkProvider, MutexReleaser]
>;
