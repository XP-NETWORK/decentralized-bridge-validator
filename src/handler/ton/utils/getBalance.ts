import type { Address, TonClient } from "@ton/ton";

export default async function getBalance(client: TonClient, address: Address) {
  return await client.getBalance(address);
}
