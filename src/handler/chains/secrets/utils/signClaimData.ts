import { sha256 } from "@noble/hashes/sha256";
import * as secp256k1 from "@noble/secp256k1";

import type { TNftTransferDetailsObject } from "../../../types";
import { convertNumbToHexToString } from "../../../utils";

export default async function signClaimData(
  data: TNftTransferDetailsObject,
  privateKey: string,
  pubk: string,
) {
  let convertedTokenId = data.tokenId;
  if (data.sourceChain === "SECRET") {
    convertedTokenId = convertNumbToHexToString(data.tokenId);
  }
  const messageHash = sha256(
    [
      convertedTokenId,
      data.sourceChain,
      data.destinationChain,
      data.destinationUserAddress,
      data.sourceNftContractAddress,
      data.name,
      data.symbol,
      data.royalty,
      data.royaltyReceiver,
      data.metadata,
      data.transactionHash,
      data.tokenAmount,
      data.nftType,
      data.fee,
      data.lockTxChain,
    ].join(""),
  );

  const signature = await secp256k1.sign(messageHash, privateKey, {
    extraEntropy: true,
    der: false,
  });
  return {
    signer: pubk,
    signature: `0x${Buffer.from(signature).toString("hex")}`,
  };
}
