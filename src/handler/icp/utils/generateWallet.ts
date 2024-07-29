import { Ed25519KeyIdentity } from "@dfinity/identity";

export default function generateWallet() {
  const identity = Ed25519KeyIdentity.generate();
  const wallet = identity.getKeyPair();
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const publicKey = wallet.publicKey.toRaw!();
  const privateKey = wallet.secretKey;

  return Promise.resolve({
    publicKey: Buffer.from(publicKey).toString("hex"),
    privateKey: Buffer.from(privateKey).toString("hex"),
  });
}
