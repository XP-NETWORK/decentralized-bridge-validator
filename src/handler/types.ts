import { TSupportedChains } from "../config";
import { EventBuilder } from "../handler";

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
};

export type EventIter = (event: LockEvent) => Promise<void>;

export interface THandler {
  addSelfAsValidator(): Promise<"success" | "failure">;
  listenForLockEvents(builder: EventBuilder, cb: EventIter): Promise<void>;
  signClaimData(
    buf: TNftTransferDetailsObject,
  ): Promise<{ signer: string; signature: string }>;
  nftData(tokenId: string, contract: string): Promise<TNftData>;
  chainIdent: TSupportedChains;
  selfIsValidator(): Promise<boolean>;
  getBalance(): Promise<bigint>;
  initialFunds: bigint;
  decimals: number;
  currency: string;
  address: string;
}

export type LockEvent = {
  tokenId: string;
  destinationChain: string;
  destinationUserAddress: string;
  sourceNftContractAddress: string;
  tokenAmount: string;
  nftType: string;
  sourceChain: string;
  transactionHash: string;
};
