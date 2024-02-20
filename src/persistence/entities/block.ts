import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";

@Entity({
  tableName: "blocks",
})
@Unique({
  properties: ["contractAddress", "chain"],
})
export class Block {
  @PrimaryKey()
  id!: number;

  @Property()
  lastBlock!: number;

  @Property()
  contractAddress!: string;

  @Property()
  chain!: string;

  constructor(lastBlock: number, contractAddress: string, chain: string) {
    this.chain = chain;
    this.lastBlock = lastBlock;
    this.contractAddress = contractAddress;
  }
}
