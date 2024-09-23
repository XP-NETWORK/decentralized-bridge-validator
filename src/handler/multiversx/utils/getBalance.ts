import type { IAddress } from "@multiversx/sdk-core/out";
import type { MXProviderFetch } from "../types";

export default async function getBalance(
  provider: MXProviderFetch,
  address: IAddress,
) {
  const [p, r] = await provider();
  const acc = await p.getAccount(address);
  r();
  return BigInt(acc.balance.toString());
}
