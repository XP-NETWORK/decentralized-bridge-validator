import { sha256 } from "@noble/hashes/sha2";
import type { Keys } from "casper-js-sdk";

export default async function signData(buf: string, signer: Keys.Ed25519) {
  const [pubKeyHex, address] = buf.split("|");
  const serialized = serialize(pubKeyHex, address);
  const hashed = sha256(serialized);
  const signature = signer.sign(hashed);

  return {
    signature: `0x${Buffer.from(signature).toString("hex")}`,
    signer: Buffer.from(signer.publicKey.value()).toString("hex"),
  };
}

function serialize(_pubKey: string, _address: string): Buffer {
  throw new Error("PANIC: Not yet implemented.");
}
