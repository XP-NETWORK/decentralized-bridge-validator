import fs from "fs";
import { prodBridgeConfig, testnetBridgeConfig } from "./config";
import { configDeps } from "./deps";
import "./environment";
import { listenEvents, listenStakeEvents } from "./handler";
import {
  ValidatorLog,
  checkOrAddSelfAsVal,
  retry,
  stakeTokens,
} from "./handler/utils";
import { configureRouter } from "./http";
import { IBridgeConfig, IGeneratedWallets } from "./types";
import { generateAndSaveWallets, requireEnoughBalance } from "./utils";

async function main() {
  if (!fs.existsSync("secrets.json")) {
    ValidatorLog("Secrets Not Found. Generating new Wallets");
    await generateAndSaveWallets();
  }
  const secrets: IGeneratedWallets = JSON.parse(
    fs.readFileSync("secrets.json", "utf-8"),
  );
  if (process.argv.includes("--help")) {
    console.info(help);
    process.exit(0);
  }

  let config: IBridgeConfig = prodBridgeConfig;

  if (process.argv.includes("--testnet")) {
    config = testnetBridgeConfig;
    ValidatorLog("Setting up for testnet environment");
  }

  const deps = await configDeps(config, secrets);
  if (process.env.SERVER_PORT) {
    const server = await configureRouter(deps.em.fork());
    server.listen(process.env.SERVER_PORT, () => {
      ValidatorLog(`Server listening on port ${process.env.SERVER_PORT}`);
    });
  }

  await requireEnoughBalance(
    deps.chains,
    config.storageConfig,
    config.stakingConfig,
    secrets,
  );

  await checkOrAddSelfAsVal(deps.chains);

  await retry(
    () => stakeTokens(config.stakingConfig, secrets, deps.chains),
    "Staking Tokens",
    10,
  );
  listenEvents(
    deps.chains,
    deps.storage,
    deps.em.fork(),
    deps.serverLinkHandler,
  );
  listenStakeEvents(deps.chains, deps.storage, deps.staking, deps.em.fork());
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
