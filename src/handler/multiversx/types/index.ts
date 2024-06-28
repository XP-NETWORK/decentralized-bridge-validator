import { EntityManager } from "@mikro-orm/sqlite";
import { INetworkProvider } from "@multiversx/sdk-network-providers/out/interface";
import { UserSigner } from "@multiversx/sdk-wallet/out";
import { AxiosInstance } from "axios";
import { BridgeStorage } from "xp-decentralized-sdk/dist/contractsTypes/evm";
import { TSupportedChainTypes, TSupportedChains } from "../../../config";

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
};
