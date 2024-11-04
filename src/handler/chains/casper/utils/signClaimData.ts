import { sha256 } from "@noble/hashes/sha256";
import type { Keys } from "casper-js-sdk";
import type { TNftTransferDetailsObject } from "../../../types";

export default async function signClaimData(
  data: TNftTransferDetailsObject,
  signer: Keys.Ed25519,
) {
  const bytes = serialize(data);
  const hash = sha256(bytes);

  const signature = signer.sign(hash);

  return {
    signer: Buffer.from(signer.publicKey.data).toString("hex"),
    signature: `0x${Buffer.from(signature).toString("hex")}`,
  };
}

function serialize(_nto: TNftTransferDetailsObject): Buffer {
  throw new Error("PANIC: Not yet implemented.");
}
