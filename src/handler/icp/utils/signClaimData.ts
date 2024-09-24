import type { ActorSubclass } from "@dfinity/agent";
import type { Ed25519KeyIdentity } from "@dfinity/identity";
import { Principal } from "@dfinity/principal";
import * as ed from "@noble/ed25519";
import type { _SERVICE } from "../../../contractsTypes/icp/bridge/bridge.types";
import type { TNftTransferDetailsObject } from "../../types";

export default async function signClaimData(
  data: TNftTransferDetailsObject,
  identity: Ed25519KeyIdentity,
  fetchBridge: () => Promise<readonly [ActorSubclass<_SERVICE>, () => void]>,
) {
  const [bc, release] = await fetchBridge();
  const encoded = await bc.encode_claim_data({
    destination_chain: data.destinationChain,
    destination_user_address: Principal.fromText(data.destinationUserAddress),
    fee: BigInt(data.fee),
    lock_tx_chain: data.lockTxChain,
    metadata: data.metadata,
    name: data.name,
    nft_type: data.nftType,
    royalty: BigInt(data.royalty),
    royalty_receiver: Principal.fromText(data.royaltyReceiver),
    source_chain: data.sourceChain,
    source_nft_contract_address: data.sourceNftContractAddress,
    symbol: data.symbol,
    token_amount: BigInt(data.tokenAmount),
    token_id: BigInt(data.tokenId),
    transaction_hash: data.transactionHash,
  });
  release();

  const signature = await ed.sign(
    Buffer.from(encoded),
    Buffer.from(identity.getKeyPair().secretKey),
  );

  return {
    signer: Buffer.from(
      await ed.getPublicKey(Buffer.from(identity.getKeyPair().secretKey)),
    ).toString("hex"),
    signature: `0x${Buffer.from(signature).toString("hex")}`,
  };
}
