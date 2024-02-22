import TonWeb from "tonweb";
import { TWallet } from "../../types";

export function generateWallet() {
  const KeyPair = TonWeb.utils.nacl.sign.keyPair();
  const response: Promise<TWallet> = Promise.resolve({
    address: TonWeb.utils.bytesToHex(KeyPair.publicKey),
    pk: TonWeb.utils.bytesToHex(KeyPair.secretKey),
  });
  return response;
}
