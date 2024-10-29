import type { Ed25519Account } from "@aptos-labs/ts-sdk";
import * as ed from "@noble/ed25519";
import { sha256 } from "@noble/hashes/sha256";

export default async function signData(buf: string, signer: Ed25519Account) {
  const hashed = sha256(buf);
  const signed = await ed.sign(hashed, signer.privateKey.toUint8Array());
  const signature = `0x${Buffer.from(signed).toString("hex")}`;
  return {
    signature,
    signer: Buffer.from(signer.publicKey.toUint8Array()).toString("hex"),
  };
}
