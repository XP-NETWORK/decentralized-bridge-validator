import { JsonRpcProvider, Wallet } from "ethers";

export function initializeEvmProviderAndWallet(rpc: string, sk: string) {
  const provider = new JsonRpcProvider(rpc);
  const wallet = new Wallet(sk, provider);
  return [provider, wallet] as const;
}
