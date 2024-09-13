import { serialize } from "@dao-xyz/borsh";
import * as ed from "@noble/ed25519";
import type { TNftTransferDetailsObject } from "../../types";
import { ClaimData } from "./signData";

export default async function signClaimData(
  data: TNftTransferDetailsObject,
  privateKey: string,
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
  const signature = await ed.sign(Buffer.from(encoded), privateKey);

  return {
    signer: Buffer.from(await ed.getPublicKey(privateKey)).toString("hex"),
    signature: `0x${Buffer.from(signature).toString("hex")}`,
  };
}
