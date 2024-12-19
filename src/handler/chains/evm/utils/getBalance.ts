import { Driver, SimpleNet } from "@vechain/connex-driver";
import { BrowserProvider, type Signer } from "ethers";
import { useMutexAndRelease } from "../../../utils";
import type { EVMProviderFetch } from "../types";

export default async function getBalance(
  signer: Signer,
  fetchProvider: EVMProviderFetch,
) {
  return useMutexAndRelease(fetchProvider, async (provider) => {
    if (provider instanceof BrowserProvider) {
      const net = new SimpleNet(
        process.env.NETWORK === "testnet"
          ? "https://sync-testnet.veblocks.net"
          : "https://mainnet.vecha.in",
      );
      const driver = await Driver.connect(net);
      return BigInt(
        (await driver.getAccount(await signer.getAddress(), "")).energy,
      );
    }
    return provider.getBalance(await signer.getAddress());
  });
}
