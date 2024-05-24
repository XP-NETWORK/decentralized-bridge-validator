import { EntityManager } from "@mikro-orm/sqlite";
import { Signer, TezosToolkit } from "@taquito/taquito";
import { BridgeStorage } from "xp-decentralized-sdk/dist/contractsTypes/evm";
import { TSupportedChainTypes, TSupportedChains } from "../../../config";

export type TezosHandlerParams = {
  provider: TezosToolkit;
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
};
