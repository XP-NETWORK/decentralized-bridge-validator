import { Keys } from "casper-js-sdk";

export default function casperGw() {
  const identity = Keys.Ed25519.new();

  return Promise.resolve({
    publicKey: Buffer.from(identity.publicKey.value()).toString("hex"),
    privateKey: Buffer.from(identity.privateKey).toString("hex"),
    address: identity.publicKey.toAccountHashStr(),
  });
}
