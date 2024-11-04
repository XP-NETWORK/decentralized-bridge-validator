import { Serializable, type Serializer } from "@aptos-labs/ts-sdk";
import type { TNftTransferDetailsObject } from "../../../types";

export class ClaimData extends Serializable {
  tokenId: bigint;
  sourceChain: string;
  destinationChain: string;
  user: string;
  sourceNftContractAddress: string;
  name: string;
  royaltyPercentage: bigint;
  royaltyPayeeAddress: string;
  metadata: string;
  transactionHash: string;
  tokenAmount: bigint;
  nftType: string;
  fee: bigint;
  symbol: string;

  constructor({
    destinationChain,
    tokenAmount,
    tokenId,
    nftType,
    fee,
    symbol,
    royalty,
    sourceChain,
    royaltyReceiver,
    metadata,
    destinationUserAddress,
    name,
    sourceNftContractAddress,
    transactionHash,
  }: TNftTransferDetailsObject) {
    super();
    this.destinationChain = destinationChain;
    this.tokenId = BigInt(tokenId);
    this.tokenAmount = BigInt(tokenAmount);
    this.nftType = nftType;
    this.fee = BigInt(fee);
    this.symbol = symbol;
    this.royaltyPayeeAddress = royaltyReceiver;
    this.royaltyPercentage = BigInt(royalty);
    this.sourceChain = sourceChain;
    this.user = destinationUserAddress;
    this.metadata = metadata;
    this.transactionHash = transactionHash;
    this.name = name;
    this.sourceNftContractAddress = sourceNftContractAddress;
  }
  serialize(serializer: Serializer): void {
    serializer.serializeU256(this.tokenId);
    serializer.serializeBytes(Buffer.from(this.sourceChain));
    serializer.serializeBytes(Buffer.from(this.destinationChain));
    serializer.serializeBytes(Buffer.from(this.user.slice(2)));
    serializer.serializeBytes(Buffer.from(this.sourceNftContractAddress));
    serializer.serializeStr(this.name);
    serializer.serializeU64(this.royaltyPercentage);
    serializer.serializeBytes(Buffer.from(this.royaltyPayeeAddress.slice(2)));
    serializer.serializeStr(this.metadata);
    serializer.serializeBytes(Buffer.from(this.transactionHash));
    serializer.serializeU256(this.tokenAmount);
    serializer.serializeBytes(Buffer.from(this.nftType));
    serializer.serializeU64(this.fee);
    serializer.serializeStr(this.symbol);
    serializer;
  }
}
