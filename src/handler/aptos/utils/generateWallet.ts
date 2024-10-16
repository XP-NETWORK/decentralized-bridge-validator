import { Ed25519Account } from "@aptos-labs/ts-sdk";

export default function icpGw() {
  const identity = Ed25519Account.generate();

  return Promise.resolve({
    publicKey: identity.publicKey.bcsToHex().toString(),
    privateKey: identity.privateKey.bcsToHex().toString(),
    principal: identity.accountAddress.toString(),
  });
}
