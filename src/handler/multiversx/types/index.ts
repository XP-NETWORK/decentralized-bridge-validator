import type { EntityManager } from "@mikro-orm/sqlite";
import type { INetworkProvider } from "@multiversx/sdk-network-providers/out/interface";
import type { UserSigner } from "@multiversx/sdk-wallet/out";
import type { AxiosInstance } from "axios";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import type { LogInstance } from "../../types";

export type MultiversXHandlerParams = {
  provider: INetworkProvider;
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
