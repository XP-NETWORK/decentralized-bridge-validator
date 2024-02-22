import { InMemorySigner } from "@taquito/signer";
import * as bip39 from "bip39";
import base58check from "bs58check";
//@ts-expect-error no types copium
import sodium from "libsodium-wrappers-sumo";

export default async function generateWallet() {
  const mnemonic = bip39.generateMnemonic(256);
  const seed = await bip39.mnemonicToSeed(mnemonic, "");
  await sodium.ready;
  const keys = sodium.crypto_sign_seed_keypair(seed.slice(0, 32), "hex");
  const b58encodedSecret = base58check.encode(
    Buffer.from(`2bf64e07${keys.privateKey}`, "hex"),
  );
  const newWallet = await InMemorySigner.fromSecretKey(b58encodedSecret);
  return {
    address: await newWallet.publicKeyHash(),
    pk: await newWallet.secretKey(),
  };
}
