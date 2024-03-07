import { UserSigner } from "@multiversx/sdk-wallet/out";
import { InMemorySigner } from "@taquito/signer";
import { Wallet } from "ethers";
import { Wallet as SecretWallet } from "secretjs";
import { keyPairFromSecretKey } from "ton-crypto";
import { IGeneratedWallets } from "../../types";

export function getSigners(genWallets: IGeneratedWallets) {
  return {
    bsc: new Wallet(genWallets.evmWallet.privateKey),
    eth: new Wallet(genWallets.evmWallet.privateKey),
    tezos: new InMemorySigner(genWallets.tezosWallet.secretKey),
    multiversx: UserSigner.fromWallet(
      genWallets.multiversXWallet.userWallet,
      genWallets.multiversXWallet.password,
    ),
    secret: new SecretWallet(genWallets.secretWallet.privateKey),
    ton: keyPairFromSecretKey(
      Buffer.from(genWallets.tonWallet.secretKey, "hex"),
    ),
  };
}
