import { prodChainSpecs, testnetChainSpecs } from "../../config/chainSpecs";
import { chainSpecs } from "../../config/types";
import { readJsonFile } from "../../utils";
import { waitForKeyPress } from "../../utils/functions";
import { generateWalletsForChains, promptToGetFunding, promtDisplayHelp } from "./components";
import { typeGuardGeneratedWallets } from "./typesGuardRuntime";
import { promises as fs } from 'fs';

const setup = async () => {
  const secretsFile = 'config/secrets.json';
  if (process.argv.includes('--help')) {
    promtDisplayHelp();
    return;
  }

  let config: chainSpecs = prodChainSpecs

  if (process.argv.includes('--testnet')) {
    config = testnetChainSpecs
  }

  let secrets = await readJsonFile(secretsFile)
  if (typeGuardGeneratedWallets(secrets)) {
    console.log("existing secrets found")
  } else {
    console.log("generating new secrets")
    secrets = generateWalletsForChains(config)
    await fs.writeFile(secretsFile, JSON.stringify(secrets));
  }
  let isNotFullyFunded = true
  while (isNotFullyFunded) {
    isNotFullyFunded = await promptToGetFunding(secrets, config);
    await waitForKeyPress("Press [Enter] key after funding your addresses");
  }

};

export { setup };
