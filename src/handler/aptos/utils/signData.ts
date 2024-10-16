import type { Account } from "@aptos-labs/ts-sdk";
import { sha256 } from "@noble/hashes/sha256";

export default async function signData(buf: string, signer: Account) {
  const hashed = sha256(buf);
  const signed = signer.sign(hashed);
  const signature = `0x${Buffer.from(signed.bcsToBytes()).toString("hex")}`;
  return {
    signature,
    signer: Buffer.from(signer.publicKey.bcsToBytes()).toString("hex"),
  };
}
