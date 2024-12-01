import { Mnemonic, UserSigner, UserWallet } from "@multiversx/sdk-wallet/out";

export default function generateWallet() {
  const mnemonic = Mnemonic.generate();
  const secretKey = mnemonic.deriveKey(0);
  const password = Math.random().toString(36).slice(2);
  const userWallet = UserWallet.fromSecretKey({ secretKey, password });
  return Promise.resolve({
    userWallet: userWallet.toJSON(),
    password,
    address: UserSigner.fromWallet(userWallet.toJSON(), password)
      .getAddress()
      .toString(),
  });
}
