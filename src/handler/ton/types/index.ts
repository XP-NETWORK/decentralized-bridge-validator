import type { EntityManager } from "@mikro-orm/sqlite";
import type { Sender } from "@ton/core";
import type { TonClient, WalletContractV4 } from "@ton/ton";
import type { AxiosInstance } from "axios";
import type { HttpProvider } from "tonweb/dist/types/providers/http-provider";
import type { BridgeStorage } from "xp-decentralized-sdk/dist/contractsTypes/evm";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import type { LogInstance } from "../../types";

export type TonParams = {
  client: TonClient;
  provider: HttpProvider;
  signer: WalletContractV4;
  bridge: string;
  storage: BridgeStorage;
  lastBlock_: number;
  walletSender: Sender;
  secretKey: string;
  initialFunds: bigint;
  em: EntityManager;
  decimals: number;
  chainType: TSupportedChainTypes;
  chainIdent: TSupportedChains;
  serverLinkHandler: AxiosInstance | undefined;
  logger: LogInstance;
};
