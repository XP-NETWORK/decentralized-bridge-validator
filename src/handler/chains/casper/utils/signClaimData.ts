import crypto from "node:crypto";
import type { Keys } from "casper-js-sdk";
import type { TNftTransferDetailsObject } from "../../../types";
import { Serializer } from "./serializer";

export default async function signClaimData(
  data: TNftTransferDetailsObject,
  signer: Keys.Ed25519,
) {
  const serializer = Serializer();
  const bytes = serializer.claimNft({
    amount: data.tokenAmount,
    name_arg: data.name,
    destination_chain_arg: data.destinationChain,
    destination_user_address_arg: data.destinationUserAddress,
    fee_arg: data.fee,
    lock_tx_chain_arg: data.lockTxChain,
    metadata_arg: data.metadata,
    nft_type_arg: data.nftType,
    royalty_arg: data.royalty,
    royalty_receiver_arg: data.royaltyReceiver,
    source_chain_arg: data.sourceChain,
    source_nft_contract_address_arg: data.sourceNftContractAddress,
    symbol_arg: data.symbol,
    token_amount_arg: data.tokenAmount,
    token_id_arg: data.tokenId,
    transaction_hash_arg: data.transactionHash,
  });
  const hash = crypto.createHash("sha256").update(bytes).digest();
  const signature = signer.sign(hash);
  return {
    signer: Buffer.from(signer.publicKey.data).toString("hex"),
    signature: `0x${Buffer.from(signature).toString("hex")}`,
  };
}
