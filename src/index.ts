import fs from "fs";
import { prodBridgeConfig, testnetBridgeConfig } from "./config";
import { configDeps } from "./deps";
import { listenEvents } from "./handler";
import { ValidatorLog, checkOrAddSelfAsVal } from "./handler/addSelf";

import { IBridgeConfig } from "./types";
import { generateWallets, requireEnoughBalance } from "./utils";

async function main() {
  if (!fs.existsSync("secrets.json")) {
    ValidatorLog("Secrets Not Found. Generating new Wallets");
    await generateWallets();
  }
  if (process.argv.includes("--help")) {
    console.info(help);
    process.exit(0);
  }

  let config: IBridgeConfig = prodBridgeConfig;

  if (process.argv.includes("--testnet")) {
    config = testnetBridgeConfig;
    console.log("Setting up for testnet environment");
  }

  const deps = await configDeps(config);

  await requireEnoughBalance(
    deps.chains,
    config.storageConfig,
    config.stakingConfig,
  );

  await checkOrAddSelfAsVal(deps.chains);

  listenEvents(deps.chains, deps.storage);
}

export const help = `
Usage:
  npm run dev [options]\n
  Options:
  --testnet         Setup for testnet environment
  --help            Display this help message and exit
By default, without any options, the script sets up for production.
`;

main();
