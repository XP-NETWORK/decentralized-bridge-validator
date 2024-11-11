import fs from "node:fs";
import { Logger } from "tslog";
import { prodBridgeConfig, testnetBridgeConfig } from "./config";
import { configDeps } from "./deps";
import "./environment";
import { createInterface } from "node:readline/promises";
import { configureValidator } from "./environment";
import { listenEvents, listenStakeEvents } from "./handler";
import { stakeTokens } from "./handler/stake-listener";
import { checkOrAddSelfAsVal, retry } from "./handler/utils";
import { configureRouter } from "./http";
import type { IBridgeConfig, IGeneratedWallets } from "./types";
import {
  requireEnoughBalance,
  requireEnoughBalanceInChains,
  syncWallets,
} from "./utils";

async function main() {
  const logger = new Logger({
    type: "pretty",
    name: "Validator",
    stylePrettyLogs: true,
    minLevel: Number.parseInt(process.env.LOG_LEVEL || "3"),
  });
  await configureValidator(logger);

  let config: IBridgeConfig = prodBridgeConfig;

  const network = process.env.NETWORK;
  if (network === "testnet") {
    logger.info("Starting up testnet");
    config = testnetBridgeConfig;
  }
  await syncWallets(logger);

  const secrets: IGeneratedWallets = JSON.parse(
    fs.readFileSync("secrets.json", "utf-8"),
  );
  if (process.argv.includes("--help")) {
    console.info(help);
    process.exit(0);
  }

  const deps = await configDeps(config, secrets, logger);
  if (process.env.SERVER_PORT) {
    const server = await configureRouter(deps.em.fork());
    server.listen(process.env.SERVER_PORT, () => {
      logger.info(`Server listening on port ${process.env.SERVER_PORT}`);
    });
  }
  const tio = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  await requireEnoughBalance(
    deps.chains,
    config.storageConfig,
    config.stakingConfig,
    secrets,
    logger,
  );

  const chainsThatNeedToBeAddedAsValidator = await requireEnoughBalanceInChains(
    deps.chains,
    tio,
    logger,
  );

  await retry(
    () =>
      stakeTokens(
        config.stakingConfig,
        deps.stakingSigner,
        deps.staker,
        secrets,
        deps.chains,
        logger,
      ),
    "Staking Tokens",
    logger,
  );

  await retry(
    () => checkOrAddSelfAsVal(chainsThatNeedToBeAddedAsValidator, logger),
    "Add self as Validator",
    logger,
  );

  listenEvents(
    deps.chains,
    deps.storage,
    deps.storageProvider,
    deps.fetchNonce,
    deps.em.fork(),
    deps.serverLinkHandler,
    logger,
  );
  listenStakeEvents(
    deps.chains,
    deps.storage,
    deps.staking,
    deps.fetchNonce,
    logger,
  );
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
