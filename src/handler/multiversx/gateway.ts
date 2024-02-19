export interface Root {
  data: Data;
  code: string;
}

export interface Data {
  hyperblock: Hyperblock;
}

export interface Hyperblock {
  hash: string;
  prevBlockHash: string;
  stateRootHash: string;
  nonce: number;
  round: number;
  epoch: number;
  numTxs: number;
  accumulatedFees: string;
  developerFees: string;
  accumulatedFeesInEpoch: string;
  developerFeesInEpoch: string;
  timestamp: number;
  shardBlocks: ShardBlock[];
  transactions: Transaction[];
  status: string;
}

export interface ShardBlock {
  hash: string;
  nonce: number;
  round: number;
  shard: number;
  rootHash: string;
  miniBlockHashes?: string[];
}

export interface Transaction {
  type: string;
  processingTypeOnSource: string;
  processingTypeOnDestination: string;
  hash: string;
  nonce: number;
  round: number;
  epoch: number;
  value: string;
  receiver: string;
  sender: string;
  gasPrice: number;
  gasLimit?: number;
  data: string;
  signature?: string;
  sourceShard: number;
  destinationShard: number;
  miniblockType: string;
  miniblockHash: string;
  status: string;
  operation: string;
  function?: string;
  initiallyPaidFee?: string;
  chainID?: string;
  version?: number;
  options: number;
  previousTransactionHash?: string;
  originalTransactionHash?: string;
  isRefund?: boolean;
  callType?: string;
}
