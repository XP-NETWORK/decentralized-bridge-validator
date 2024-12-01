import { Wallet } from "secretjs";

export default function generateWallet() {
  const wallet = new Wallet();

  return Promise.resolve({
    publicKey: Buffer.from(wallet.publicKey).toString("hex"),
    privateKey: Buffer.from(wallet.privateKey).toString("hex"),
    address: wallet.address,
  });
}
