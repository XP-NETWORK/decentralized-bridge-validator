import { field, serialize } from "@dao-xyz/borsh";
import type { KeyPairEd25519 } from "near-api-js/lib/utils";

export class AddValidator {
  @field({ type: "string" })
  account_id: string;

  @field({ type: "string" })
  public_key: string;

  constructor(account_id: string, public_key: string) {
    this.account_id = account_id;
    this.public_key = public_key;
  }
}

export class ClaimData {
  @field({ type: "string" })
  token_id: string;
  @field({ type: "string" })
  source_chain: string;
  @field({ type: "string" })
  destination_chain: string;
  @field({ type: "string" })
  destination_user_address: string;
  @field({ type: "string" })
  source_nft_contract_address: string;
  @field({ type: "string" })
  name: string;
  @field({ type: "string" })
  symbol: string;
  @field({ type: "u16" })
  royalty: number;
  @field({ type: "string" })
  royalty_receiver: string;
  @field({ type: "string" })
  metadata: string;
  @field({ type: "string" })
  transaction_hash: string;
  @field({ type: "u128" })
  token_amount: bigint;
  @field({ type: "string" })
  nft_type: string;
  @field({ type: "u128" })
  fee: bigint;
  @field({ type: "string" })
  lock_tx_chain: string;

  constructor(
    token_id: string,
    source_chain: string,
    destination_chain: string,
    destination_user_address: string,
    source_nft_contract_address: string,
    name: string,
    symbol: string,
    royalty: number,
    royalty_receiver: string,
    metadata: string,
    transaction_hash: string,
    token_amount: bigint,
    nft_type: string,
    fee: bigint,
    lock_tx_chain: string,
  ) {
    this.token_id = token_id;
    this.source_chain = source_chain;
    this.destination_chain = destination_chain;
    this.destination_user_address = destination_user_address;
    this.source_nft_contract_address = source_nft_contract_address;
    this.name = name;
    this.symbol = symbol;
    this.royalty = royalty;
    this.royalty_receiver = royalty_receiver;
    this.metadata = metadata;
    this.transaction_hash = transaction_hash;
    this.token_amount = token_amount;
    this.nft_type = nft_type;
    this.fee = fee;
    this.lock_tx_chain = lock_tx_chain;
  }
}

export default async function signData(buf: string, kp: KeyPairEd25519) {
  const [account_id, public_key] = buf.split("|");
  const av = new AddValidator(account_id, public_key);
  const encoded = serialize(av);
  const { signature, publicKey } = kp.sign(encoded);
  const sig = `0x${Buffer.from(signature).toString("hex")}`;
  return {
    signature: sig,
    signer: Buffer.from(publicKey.data).toString("hex"),
  };
}
