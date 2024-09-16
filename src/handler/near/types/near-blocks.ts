export interface Transaction {
  id: string;
  receipt_id: string;
  predecessor_account_id: string;
  receiver_account_id: string;
  receipt_kind: string;
  receipt_block: ReceiptBlock;
  receipt_outcome: ReceiptOutcome;
  transaction_hash: string;
  included_in_block_hash: string;
  block_timestamp: string;
  block: Block;
  receipt_conversion_tokens_burnt: string;
  actions: Action[];
  actions_agg: ActionsAgg;
  outcomes: Outcomes;
  outcomes_agg: OutcomesAgg;
}

export interface Action {
  action: string;
  method: string;
  deposit: number;
  fee: number;
  args: string;
}

export interface ActionsAgg {
  deposit: number;
}

export interface Block {
  block_height: number;
}

export interface Outcomes {
  status: boolean;
}

export interface OutcomesAgg {
  transaction_fee: number;
}

export interface ReceiptBlock {
  block_hash: string;
  block_height: number;
  block_timestamp: number;
}

export interface ReceiptOutcome {
  gas_burnt: number;
  tokens_burnt: number;
  executor_account_id: string;
  status: boolean;
}
