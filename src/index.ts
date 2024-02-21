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

  const deps = await configDeps(config);

  for (const chain of deps.chains) {
    const selfIsValidator = await chain.selfIsValidator();
    console.log(`Validator is already added to ${chain.chainIdent}`);
    if (!selfIsValidator) {
      const added = await chain.addSelfAsValidator();
      if (added === "failure") {
        throw new Error(
          `Failed to add self as validator for chain ${chain.chainIdent}`,
        );
      }
    }
  }

  emitEvents(deps.chains, deps.storage);
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
