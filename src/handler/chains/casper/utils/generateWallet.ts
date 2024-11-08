import { Keys } from "casper-js-sdk";

export default function casperGw() {
  const identity = Keys.Ed25519.new();

  return Promise.resolve({
    publicKey: `0x${Buffer.from(identity.publicKey.value()).toString("hex")}`,
    privateKey: `0x${Buffer.from(identity.privateKey).toString("hex")}`,
    address: identity.accountHex(true),
  });
}
