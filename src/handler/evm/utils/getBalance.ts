import { JsonRpcProvider, Signer } from "ethers";

export default async function getBalance(
  signer: Signer,
  provider: JsonRpcProvider,
) {
  return provider.getBalance(signer);
}
