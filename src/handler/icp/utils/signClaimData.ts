import { IDL } from "@dfinity/candid";
import type { Ed25519KeyIdentity } from "@dfinity/identity";
import { Principal } from "@dfinity/principal";
import type { TNftTransferDetailsObject } from "../../types";

export default async function signClaimData(
  data: TNftTransferDetailsObject,
  identity: Ed25519KeyIdentity,
) {
  const encoded = ClaimData.encodeValue({
    fee: BigInt(data.fee),
    source_chain: data.sourceChain,
    lock_tx_chain: data.lockTxChain,
    transaction_hash: data.transactionHash,
    token_amount: BigInt(data.tokenAmount),
    destination_chain: data.destinationChain,
    token_id: data.tokenId,
    source_nft_contract_address: data.sourceNftContractAddress,
    metadata: data.metadata,
    name: data.name,
    nft_type: data.nftType,
    royalty: BigInt(data.royalty),
    royalty_receiver: Principal.fromText(data.royaltyReceiver),
    destination_user_address: Principal.fromText(data.destinationUserAddress),
    symbol: data.symbol,
  });

  const signature = await identity.sign(encoded);

  return {
    signer: Buffer.from(identity.getPublicKey().toRaw()).toString("hex"),
    signature: `0x${Buffer.from(signature).toString("hex")}`,
  };
}

const ClaimData = IDL.Record({
  fee: IDL.Nat64,
  source_chain: IDL.Text,
  lock_tx_chain: IDL.Text,
  transaction_hash: IDL.Text,
  token_amount: IDL.Nat,
  destination_chain: IDL.Text,
  token_id: IDL.Nat,
  source_nft_contract_address: IDL.Text,
  metadata: IDL.Text,
  name: IDL.Text,
  nft_type: IDL.Text,
  royalty: IDL.Nat,
  royalty_receiver: IDL.Principal,
  destination_user_address: IDL.Principal,
  symbol: IDL.Text,
});
