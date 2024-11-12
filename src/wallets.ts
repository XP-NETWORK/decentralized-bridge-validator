import fs from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { generateWallet as aptosGw } from "./handler/chains/aptos/utils";
import { generateWallet as evmGw } from "./handler/chains/evm/utils";
import { generateWallet as icpGw } from "./handler/chains/icp/utils";
import { generateWallet as mxGw } from "./handler/chains/multiversx/utils";
import { generateWallet as nearGw } from "./handler/chains/near/utils";
import { generateWallet as secretGw } from "./handler/chains/secrets/utils";
import { generateWallet as tzGw } from "./handler/chains/tezos/utils";
import { generateWallet as tonGw } from "./handler/chains/ton/utils";
import type { LogInstance } from "./handler/types";
import type { IGeneratedWallets } from "./types";

export async function syncWallets(
  logger: LogInstance,
): Promise<IGeneratedWallets> {
  const rootDirPath = path.resolve(__dirname, ".."); // Adjust based on actual structure
  const secretsPath = path.join(rootDirPath, "secrets.json");
  if (!fs.existsSync(secretsPath)) {
    logger.warn("Secrets Not Found. Generating new Wallets");
    const wallets: IGeneratedWallets = {
      evmWallet: await evmGw()(),
      secretWallet: await secretGw(),
      tezosWallet: await tzGw(),
      multiversXWallet: await mxGw(),
      tonWallet: await tonGw(),
      icpWallet: await icpGw(),
      nearWallet: await nearGw(),
      aptosWallet: await aptosGw(),
    };
    await writeFile(secretsPath, JSON.stringify(wallets));
    return wallets;
  }
  const sc = await readFile(secretsPath, { encoding: "utf-8" });
  const secrets = JSON.parse(sc);
  if (!("evmWallet" in secrets)) {
    logger.warn("Generating new wallet for Evm");
    secrets.evmWallet = await evmGw()();
  } else if (!("secretWallet" in secrets)) {
    logger.warn("Generating new wallet for Secret/Cosmwasm");
    secrets.secretWallet = await secretGw();
  } else if (!("tezosWallet" in secrets)) {
    logger.warn("Generating new wallet for Tezos");
    secrets.tezosWallet = await tzGw();
  } else if (!("multiversXWallet" in secrets)) {
    logger.warn("Generating new wallet for Multiversx");
    secrets.multiversXWallet = await mxGw();
  } else if (!("tonWallet" in secrets)) {
    logger.warn("Generating new wallet for Ton");
    secrets.tonWallet = await tonGw();
  } else if (!("icpWallet" in secrets)) {
    logger.warn("Generating new wallet for ICP");
    secrets.icpWallet = await icpGw();
  } else if (!("nearWallet" in secrets)) {
    logger.warn("No wallet for near found, please add it to secrets.json");
    // process.exit(1);
  } else if (!("aptosWallet" in secrets)) {
    logger.warn("Generating new wallet for Aptos");
    secrets.aptosWallet = await aptosGw();
  }
  await writeFile(secretsPath, JSON.stringify(secrets, null, 4));
  return secrets;
}
