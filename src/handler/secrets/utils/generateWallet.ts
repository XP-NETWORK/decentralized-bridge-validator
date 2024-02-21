import { Wallet } from "secretjs";

export function generateWallet() {
  const wallet = new Wallet();
  const pk = Buffer.from(wallet.privateKey).toString("hex");
  const address = wallet.address;
  return Promise.resolve({
    address,
    pk,
  });
}