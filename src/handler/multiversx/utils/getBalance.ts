import { IAddress } from "@multiversx/sdk-core/out";
import { INetworkProvider } from "@multiversx/sdk-network-providers/out/interface";

export default async function getBalance(
  provider: INetworkProvider,
  address: IAddress,
) {
  const acc = await provider.getAccount(address);
  return BigInt(acc.balance.toString());
}
