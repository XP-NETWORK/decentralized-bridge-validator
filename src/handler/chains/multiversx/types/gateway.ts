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
  txHash: string;
  gasLimit: number;
  gasPrice: number;
  gasUsed: number;
  miniBlockHash: string;
  nonce: number;
  receiver: string;
  receiverShard: number;
  round: number;
  sender: string;
  senderShard: number;
  signature: string;
  status: string;
  value: string;
  fee: string;
  timestamp: number;
  data: string;
  function: string;
  action: {
    category: string;
    name: string;
  };
}
