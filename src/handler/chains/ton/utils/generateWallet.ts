import { WalletContractV4 } from "@ton/ton";
import TonWeb from "tonweb";

export default async function generateWallet() {
  const KeyPair = TonWeb.utils.nacl.sign.keyPair();

  return {
    publicKey: TonWeb.utils.bytesToHex(KeyPair.publicKey),
    secretKey: TonWeb.utils.bytesToHex(KeyPair.secretKey),
    address: WalletContractV4.create({
      publicKey: Buffer.from(KeyPair.publicKey),
      workchain: 0,
    }).address,
  };
}
