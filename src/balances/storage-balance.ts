import type { Interface } from "node:readline/promises";
import { JsonRpcProvider, VoidSigner, ethers } from "ethers";
import { getBalance } from "../handler/chains/evm/utils";
import type { LogInstance } from "../handler/types";
import type { IEvmChainConfig, IGeneratedWallets } from "../types";

export async function requireEnoughStorageChainBalance(
  storageConfig: IEvmChainConfig,
  stdio: Interface,
  secrets: IGeneratedWallets,
  log: LogInstance,
) {
  // Check for Storage Funds
  let storageFunded = false;
  while (!storageFunded) {
    const balance = await getBalance(
      new VoidSigner(secrets.evmWallet.address),
      async () => {
        return [new JsonRpcProvider(storageConfig.rpcURL), () => {}];
      },
    );
    if (balance < BigInt(storageConfig.intialFund)) {
      log.error(
        `Balance: ${ethers.formatEther(balance)}; Fund your wallet ${
          secrets.evmWallet.address
        } on ${storageConfig.chain} with ${ethers.formatEther(
          BigInt(storageConfig.intialFund) - balance,
        )} ${storageConfig.nativeCoinSymbol}.`,
      );
      // Sleep for 10 Seconds
      await stdio.question(
        "Press Enter to continue after funding the wallet...",
      );
      continue;
    }
    storageFunded = true;
  }
  log.info("Storage Has Enough Funds: ✅");
}
