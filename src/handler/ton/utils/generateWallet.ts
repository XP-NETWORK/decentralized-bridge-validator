import TonWeb from "tonweb";

export default async function generateWallet() {
  const KeyPair = TonWeb.utils.nacl.sign.keyPair();

  return {
    publicKey: TonWeb.utils.bytesToHex(KeyPair.publicKey),
    secretKey: TonWeb.utils.bytesToHex(KeyPair.secretKey),
  };
}
