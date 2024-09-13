import { KeyPair } from "near-api-js";
import type { KeyPairEd25519 } from "near-api-js/lib/utils";

export default function nearGw() {
  const kp = KeyPair.fromRandom("ed25519") as KeyPairEd25519;
  const publicKey = kp.getPublicKey().data;
  const privateKey = kp.secretKey;

  return Promise.resolve({
    publicKey: Buffer.from(publicKey).toString("hex"),
    privateKey: Buffer.from(privateKey).toString("hex"),
  });
}
