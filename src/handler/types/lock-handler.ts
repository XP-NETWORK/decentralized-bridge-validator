import type {
  TNftTransferDetailsObject,
  TNftTransferDetailsObjectIter,
} from ".";
import type { LockEventIter, LogInstance, TNftData } from ".";
import type { TSupportedChainTypes, TSupportedChains } from "../../config";
import type { EventBuilder } from "../event-builder";

export interface THandler {
  addSelfAsValidator(): Promise<"success" | "failure">;
  listenForLockEvents(builder: EventBuilder, cb: LockEventIter): Promise<void>;
  pollForLockEvents(
    builder: EventBuilder,
    cb: TNftTransferDetailsObjectIter,
    cbLe: LockEventIter,
  ): Promise<void>;
  signClaimData(
    nfto: TNftTransferDetailsObject,
  ): Promise<{ signer: string; signature: string }>;
  signData(buf: string): Promise<{ signer: string; signature: string }>;
  nftData(
    tokenId: string,
    contract: string,
    logger: LogInstance,
  ): Promise<TNftData>;
  validateNftData(
    data: TNftData,
  ): { valid: false; reason: string } | { valid: true };
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
