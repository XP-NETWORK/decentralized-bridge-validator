import { prodChainSpecs, testnetChainSpecs } from "../../config/chainSpecs";
import { IChainSpecs } from "../../config/types";
import { readJsonFile } from "../../utils";
import { getPrivateKeyForBridgeChain, waitForKeyPress } from "../../utils/functions";
import { generateWalletsForChains, isStaked, promptToGetFunding, promtDisplayHelp } from "./components";
import stakeTokens from "./components/stakeToken";
import { typeGuardGeneratedWallets } from "./typesGuardRuntime";
import { promises as fs } from 'fs';

const setup = async () => {
  const secretsFile = 'config/secrets.json';
  if (process.argv.includes('--help')) {
    promtDisplayHelp();
    return;
  }

  let config: IChainSpecs = prodChainSpecs

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
  const stakingChainPrivateKey = getPrivateKeyForBridgeChain({ chainName: config.stakingConfig.chain, secrets })

  if (await isStaked({ stakingConfig: config.stakingConfig, privateKey: stakingChainPrivateKey })) {
    console.log("Stake found")
  } else {
    let isNotFullyFunded = true
    while (isNotFullyFunded) {
      isNotFullyFunded = await promptToGetFunding(secrets, config);
      if (isNotFullyFunded)
        await waitForKeyPress("Press [Enter] key after funding your addresses");
    }
    stakeTokens({ stakingConfig: config.stakingConfig, privateKey: stakingChainPrivateKey })
  }
};

export { setup };
