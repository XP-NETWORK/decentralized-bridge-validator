import { sha256 } from "@noble/hashes/sha256";
import * as secp256k1 from "@noble/secp256k1";
import { encodeSecp256k1Pubkey } from "secretjs/dist/wallet_amino";

export default async function signData(buf: string, pk: string, pubk: string) {
  const messageHash = sha256(
    encodeSecp256k1Pubkey(Buffer.from(buf, "hex")).value,
  );
  const signature = `0x${Buffer.from(
    await secp256k1.sign(messageHash, pk, {
      extraEntropy: true,
      der: false,
    }),
  ).toString("hex")}`;
  return { signature, signer: pubk };
}
