import { type Account, Serializer } from "@aptos-labs/ts-sdk";
import { sha256 } from "@noble/hashes/sha256";
import type { TNftTransferDetailsObject } from "../../types";
import { ClaimData } from "./aptosClaimData";

export default async function signClaimData(
  data: TNftTransferDetailsObject,
  signer: Account,
) {
  const serializer = new Serializer();
  const cd = new ClaimData(data);

  cd.serialize(serializer);
  const bytes = serializer.toUint8Array();
  const hash = sha256(bytes);
  const signature = signer.sign(hash);

  return {
    signer: Buffer.from(signer.publicKey.toUint8Array()).toString("hex"),
    signature: signature.bcsToHex().toString(),
  };
}
