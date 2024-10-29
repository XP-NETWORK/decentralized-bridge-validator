import { type Ed25519Account, Serializer } from "@aptos-labs/ts-sdk";
import * as ed from "@noble/ed25519";
import { sha256 } from "@noble/hashes/sha256";
import type { TNftTransferDetailsObject } from "../../types";
import { ClaimData } from "./aptosClaimData";

export default async function signClaimData(
  data: TNftTransferDetailsObject,
  signer: Ed25519Account,
) {
  const serializer = new Serializer();
  const cd = new ClaimData(data);

  cd.serialize(serializer);
  const bytes = serializer.toUint8Array();
  const hash = sha256(bytes);
  const signature = await ed.sign(hash, signer.privateKey.toUint8Array());

  return {
    signer: Buffer.from(signer.publicKey.toUint8Array()).toString("hex"),
    signature: `0x${Buffer.from(signature).toString("hex")}`,
  };
}
