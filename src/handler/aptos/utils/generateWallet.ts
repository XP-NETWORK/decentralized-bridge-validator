import { Ed25519Account } from "@aptos-labs/ts-sdk";

export default function icpGw() {
  const identity = Ed25519Account.generate();

  return Promise.resolve({
    publicKey: `0x${Buffer.from(identity.publicKey.toUint8Array()).toString(
      "hex",
    )}`,
    privateKey: `0x${Buffer.from(identity.privateKey.toUint8Array()).toString(
      "hex",
    )}`,
    address: identity.accountAddress.toString(),
  });
}
