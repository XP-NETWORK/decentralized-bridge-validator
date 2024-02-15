import { testnetBridgeConfig } from "./config";
import { configDeps } from "./deps";
import { IBridgeConfig } from "./types";
import { emitEvents } from "./types/handler";

async function main() {
  if (process.argv.includes("--help")) {
    console.info(help);
    process.exit(0);
  }

  let config: IBridgeConfig = testnetBridgeConfig;

  if (process.argv.includes("--testnet")) {
    config = testnetBridgeConfig;
    console.log("Setting up for testnet environment");
  }
  console.log(config);

  const deps = await configDeps(config);

  emitEvents([...deps.chains.evm], deps.storage);
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
