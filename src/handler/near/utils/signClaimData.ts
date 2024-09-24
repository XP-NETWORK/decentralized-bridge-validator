import { serialize } from "@dao-xyz/borsh";
import type { KeyPairEd25519 } from "near-api-js/lib/utils";
import type { TNftTransferDetailsObject } from "../../types";
import { ClaimData } from "./signData";

export default async function signClaimData(
  data: TNftTransferDetailsObject,
  kp: KeyPairEd25519,
) {
  const cd = new ClaimData(
    data.tokenId,
    data.sourceChain,
    data.destinationChain,
    data.destinationUserAddress,
    data.sourceNftContractAddress,
    data.name,
    data.symbol,
    Number(data.royalty),
    data.royaltyReceiver,
    data.metadata,
    data.transactionHash,
    BigInt(data.tokenAmount),
    data.nftType,
    BigInt(data.fee),
    data.lockTxChain,
  );
  const encoded = serialize(cd);
  const { publicKey, signature } = kp.sign(encoded);

  return {
    signer: Buffer.from(publicKey.data).toString("hex"),
    signature: `0x${Buffer.from(signature).toString("hex")}`,
  };
}
