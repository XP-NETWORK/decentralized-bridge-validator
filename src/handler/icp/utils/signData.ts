import type { Ed25519KeyIdentity } from "@dfinity/identity";

export default async function signData(
  buf: string,
  identity: Ed25519KeyIdentity,
) {
  const signtureBytes = await identity.sign(Buffer.from(buf, "hex"));
  const signature = Buffer.from(signtureBytes).toString("hex");
  return {
    signature,
    signer: Buffer.from(identity.getPublicKey().toRaw()).toString("hex"),
  };
}
