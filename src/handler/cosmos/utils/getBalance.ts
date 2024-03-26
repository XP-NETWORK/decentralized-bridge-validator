import { AccountData } from "@cosmjs/amino";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export default async function getBalance(
  client: SigningCosmWasmClient,
  sender: AccountData,
) {
  const balance = await client.getBalance(sender.address, "uatom");
  return BigInt(balance?.amount ?? 0);
}
