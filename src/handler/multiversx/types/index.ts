import { EntityManager } from "@mikro-orm/sqlite";
import { INetworkProvider } from "@multiversx/sdk-network-providers/out/interface";
import { UserSigner } from "@multiversx/sdk-wallet/out";
import { BridgeStorage } from "xp-decentralized-sdk/dist/contractsTypes/evm";

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
};
