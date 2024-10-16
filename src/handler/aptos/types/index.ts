import type { Account, Aptos } from "@aptos-labs/ts-sdk";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { AxiosInstance } from "axios";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import type { LogInstance } from "../../types";

export type AptosHandlerParams = {
  fetchProvider: AptosProviderFetch;
  signer: Account;
  bridgeAccount: Account;
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

export type AptosProviderFetch = () => Promise<[Aptos, () => void]>;
