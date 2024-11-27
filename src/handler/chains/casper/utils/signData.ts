import type { Keys } from "casper-js-sdk";

export default async function signData(buf: string, signer: Keys.Ed25519) {
  const hashed = Buffer.from(buf.replace("0x", ""), "hex");
  const signature = signer.sign(hashed);

  return {
    signature: `0x${Buffer.from(signature).toString("hex")}`,
    signer: Buffer.from(signer.publicKey.data).toString("hex"),
  };
}
