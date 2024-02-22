import * as secp256k1 from "@noble/secp256k1";
import { sha256 } from "ethers";
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
    signer: wallet.address,
    signature: `0x${Buffer.from(signature).toString("hex")}`,
  };
}
