import { Wallet } from "secretjs";

export default function generateWallet() {
  const wallet = new Wallet();
  const pk = Buffer.from(wallet.privateKey).toString("hex");
  const address = wallet.address;
  return Promise.resolve({
    address,
    pk,
    pubK: Buffer.from(wallet.publicKey).toString("hex"),
  });
}
