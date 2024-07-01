import { EntityManager } from "@mikro-orm/sqlite";
import { Sender } from "@ton/core";
import { TonClient, WalletContractV4 } from "@ton/ton";
import { AxiosInstance } from "axios";
import { HttpProvider } from "tonweb/dist/types/providers/http-provider";
import { BridgeStorage } from "xp-decentralized-sdk/dist/contractsTypes/evm";
import { TSupportedChainTypes, TSupportedChains } from "../../../config";
import { LogInstance } from "../../types";

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
