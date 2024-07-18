import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";

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
  tokenId!: bigint;

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

  constructor(
    tokenId: string,
    destinationChain: string,
    destinationUserAddress: string,
    sourceNftContractAddress: string,
    tokenAmount: string,
    nftType: string,
    sourceChain: string,
    transactionHash: string,
    listenerChain: string,
  ) {
    this.tokenId = BigInt(tokenId);
    this.destinationUserAddress = destinationUserAddress;
    this.sourceChain = sourceChain;
    this.tokenAmount = BigInt(tokenAmount);
    this.nftType = nftType;
    this.transactionHash = transactionHash;
    this.sourceNftContractAddress = sourceNftContractAddress;
    this.destinationChain = destinationChain;
    this.listenerChain = listenerChain;
  }
}
