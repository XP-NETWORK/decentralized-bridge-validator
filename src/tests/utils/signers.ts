import { DirectSecp256k1Wallet } from "@cosmjs/proto-signing";
import { UserSigner } from "@multiversx/sdk-wallet/out";
import { InMemorySigner } from "@taquito/signer";
import { Wallet } from "ethers";
import { Wallet as SecretWallet } from "secretjs";
import { keyPairFromSecretKey } from "ton-crypto";
import { userSignerToSigner } from "xp-decentralized-sdk";
import { IGeneratedWallets } from "../../types";
import { Ed25519KeyIdentity } from "@dfinity/identity";

export function getSigners(genWallets: IGeneratedWallets) {
  return {
    bsc: new Wallet(genWallets.evmWallet.privateKey),
    eth: new Wallet(genWallets.evmWallet.privateKey),
    tezos: new InMemorySigner(genWallets.tezosWallet.secretKey),
    multiversx: userSignerToSigner(
      UserSigner.fromWallet(
        genWallets.multiversXWallet.userWallet,
        genWallets.multiversXWallet.password,
      ),
    ),
    secret: new SecretWallet(genWallets.secretWallet.privateKey),
    ton: keyPairFromSecretKey(
      Buffer.from(genWallets.tonWallet.secretKey, "hex"),
    ),
    terra: DirectSecp256k1Wallet.fromKey(
      Buffer.from(genWallets.secretWallet.privateKey, "hex"),
      "terra",
    ),
    icp: Ed25519KeyIdentity.fromSecretKey(Buffer.from(genWallets.icpWallet.privateKey, "hex"))
  };
}
