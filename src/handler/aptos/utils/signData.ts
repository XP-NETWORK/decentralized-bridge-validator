import { type Ed25519Account, Serializer } from "@aptos-labs/ts-sdk";
import * as ed from "@noble/ed25519";
import { sha256 } from "@noble/hashes/sha2";

export default async function signData(buf: string, signer: Ed25519Account) {
  const [pubKeyHex, address] = buf.split("|");
  const serializer = new Serializer();

  serializer.serializeBytes(Buffer.from(pubKeyHex, "hex"));
  serializer.serializeFixedBytes(Buffer.from(address.slice(2), "hex"));
  const hashed = sha256(serializer.toUint8Array());
  const signed = await ed.sign(hashed, signer.privateKey.toUint8Array());
  const signature = `0x${Buffer.from(signed).toString("hex")}`;
  return {
    signature,
    signer: Buffer.from(signer.publicKey.toUint8Array()).toString("hex"),
  };
}
