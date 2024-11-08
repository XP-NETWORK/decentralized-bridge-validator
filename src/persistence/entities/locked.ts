import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import type { TNftTransferDetailsObject } from "xp-decentralized-sdk";

@Entity({
  tableName: "locked_event",
})
@Unique({
  properties: ["transactionHash", "listenerChain"],
})
export class LockedEvent {
  @PrimaryKey()
  id!: number;

  @Property()
  tokenAmount!: bigint;

  @Property()
  tokenId!: string;

  @Property()
  destinationUserAddress!: string;

  @Property()
  destinationChain!: string;

  @Property()
  sourceNftContractAddress!: string;

  @Property()
  nftType!: string;

  @Property()
  sourceChain!: string;

  @Property()
  transactionHash!: string;

  @Property()
  listenerChain!: string;

  @Property({ default: "" })
  metaDataUri!: string;

  @Property({ default: false })
  status!: boolean;

  @Property()
  name!: string;

  @Property()
  symbol!: string;

  @Property()
  royalty!: bigint;

  @Property()
  royaltyReceiver!: string;

  @Property()
  fee!: bigint;

  @Property({ nullable: true })
  imgUri?: string;

  constructor({
    tokenId,
    destinationChain,
    destinationUserAddress,
    sourceChain,
    fee,
    lockTxChain,
    tokenAmount,
    transactionHash,
    nftType,
    name,
    symbol,
    royalty,
    royaltyReceiver,
    metadata,
    imgUri,
    sourceNftContractAddress,
  }: TNftTransferDetailsObject) {
    this.tokenId = tokenId;
    this.destinationUserAddress = destinationUserAddress;
    this.sourceChain = sourceChain;
    this.tokenAmount = BigInt(tokenAmount);
    this.nftType = nftType;
    this.transactionHash = transactionHash;
    this.sourceNftContractAddress = sourceNftContractAddress;
    this.destinationChain = destinationChain;
    this.listenerChain = lockTxChain;
    this.metaDataUri = metadata;
    this.imgUri = imgUri;
    this.royaltyReceiver = royaltyReceiver;
    this.name = name;
    this.symbol = symbol;
    this.fee = BigInt(fee);
    this.royalty = BigInt(royalty);
  }

  toNTO(): TNftTransferDetailsObject {
    return {
      destinationChain: this.destinationChain,
      destinationUserAddress: this.destinationUserAddress,
      fee: this.fee.toString(),
      lockTxChain: this.listenerChain,
      metadata: this.metaDataUri,
      name: this.name,
      nftType: this.nftType,
      royalty: this.royalty.toString(),
      royaltyReceiver: this.royaltyReceiver,
      sourceChain: this.sourceChain,
      sourceNftContractAddress: this.sourceNftContractAddress,
      symbol: this.symbol,
      tokenAmount: this.tokenAmount.toString(),
      tokenId: this.tokenId.toString(),
      transactionHash: this.transactionHash,
      imgUri: this.imgUri,
    };
  }
}
