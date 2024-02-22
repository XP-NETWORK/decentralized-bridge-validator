import TonWeb from "tonweb";
import { HttpProvider } from "tonweb/dist/types/providers/http-provider";
import { TWallet } from "../../types";

export default async function generateWallet(provider: HttpProvider) {
  const KeyPair = TonWeb.utils.nacl.sign.keyPair();
  const wallet = new TonWeb.Wallets.all.v3R2(provider, {
    publicKey: KeyPair.publicKey,
    wc: -1,
  });
  const response: TWallet = {
    address: (await wallet.getAddress()).toString(),
    pk: TonWeb.utils.bytesToHex(KeyPair.secretKey),
    pubK: TonWeb.utils.bytesToHex(KeyPair.publicKey),
  };
  return response;
}
