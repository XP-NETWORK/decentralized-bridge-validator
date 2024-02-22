import { Mnemonic } from "@multiversx/sdk-wallet/out";

export default function generateWallet() {
  const mnemonic = Mnemonic.generate();
  const secretKey = mnemonic.deriveKey(0);

  return Promise.resolve({
    address: secretKey.generatePublicKey().toAddress().bech32(),
    pk: secretKey.hex(),
    pubK: secretKey.generatePublicKey().hex(),
  });
}
