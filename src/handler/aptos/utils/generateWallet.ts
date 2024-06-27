import { Account } from "@aptos-labs/ts-sdk";

export default function generateWallet() {
  const account = Account.generate();

  return Promise.resolve({
    publicKey: account.publicKey.toString(),
    privateKey: account.privateKey.toString(),
  });
}

generateWallet().then((v) => console.log(v));
