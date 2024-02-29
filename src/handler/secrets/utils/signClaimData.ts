import { sha256 } from "@noble/hashes/sha256";
import * as secp256k1 from "@noble/secp256k1";
import { Wallet } from "secretjs";
import { TNftTransferDetailsObject } from "../../types";

export default async function signClaimData(
  data: TNftTransferDetailsObject,
  wallet: Wallet,
) {
  const messageHash = sha256(Object.values(data).join(""));

  const signature = await secp256k1.sign(messageHash, wallet.privateKey, {
    extraEntropy: true,
    der: false,
  });
  return {
    signer: Buffer.from(wallet.publicKey).toString("hex"),
    signature: `0x${Buffer.from(signature).toString("hex")}`,
  };
}
