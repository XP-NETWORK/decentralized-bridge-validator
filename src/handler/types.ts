import type { Logger } from "tslog";
import type { TSupportedChainTypes, TSupportedChains } from "../config";
import type { EventBuilder } from "../handler";

export type TNftData = {
  name: string;
  symbol: string;
  metadata: string;
  royalty: bigint;
};

export type TNftTransferDetailsObject = {
  tokenId: string;
  sourceChain: string;
  destinationChain: string;
  destinationUserAddress: string;
  sourceNftContractAddress: string;
  name: string;
  symbol: string;
  royalty: string;
  royaltyReceiver: string;
  metadata: string;
  transactionHash: string;
  tokenAmount: string;
  nftType: string;
  fee: string;
  lockTxChain: string;
  imgUri?: string;
};

export type LockEventIter = (event: LockEvent) => Promise<void>;
export type StakeEventIter = (event: StakeEvent) => Promise<void>;

export interface THandler {
  addSelfAsValidator(): Promise<"success" | "failure">;
  listenForLockEvents(builder: EventBuilder, cb: LockEventIter): Promise<void>;
  poolForFailEvents(builder: EventBuilder, cb: LockEventIter): Promise<void>;
  pollForLockEvents(builder: EventBuilder, cb: LockEventIter): Promise<void>;
  signClaimData(
    nfto: TNftTransferDetailsObject,
  ): Promise<{ signer: string; signature: string }>;
  signData(buf: string): Promise<{ signer: string; signature: string }>;
  nftData(
    tokenId: string,
    contract: string,
    logger: LogInstance,
  ): Promise<TNftData>;
  chainIdent: TSupportedChains;
  selfIsValidator(): Promise<boolean>;
  getBalance(): Promise<bigint>;
  initialFunds: bigint;
  currency: string;
  address: string;
  chainType: TSupportedChainTypes;
  publicKey: string;
  decimals: bigint;
}

export interface TStakingHandler {
  listenForStakingEvents(
    builder: EventBuilder,
    cb: StakeEventIter,
  ): Promise<void>;
}

export type LockEvent = {
  listenerChain: string;
  tokenId: string;
  destinationChain: string;
  destinationUserAddress: string;
  sourceNftContractAddress: string;
  tokenAmount: string;
  nftType: string;
  sourceChain: string;
  transactionHash: string;
  metaDataUri: string;
};

export type StakeEvent = {
  validatorAddress: string;
  caller: string;
  chainType: TSupportedChainTypes;
}[];

export type LogInstance = Logger<unknown>;
