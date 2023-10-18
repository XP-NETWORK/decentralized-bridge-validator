import { prodChainSpecs, testnetChainSpecs } from "../../config/chainSpecs";
import { IChainSpecs } from "../../config/types";
import { AppDataSource } from "../../db/data-source";
import { readJsonFile } from "../../utils";
import { waitForKeyPress } from "../../utils/functions";
import waitForMSWithMsg from "../../utils/functions/waitForMSWithMsg";
import { runValidators } from "../validator";
import { redisIOConnection } from "../validator/utils";
import { generateWalletsForChains, isStaked, promptToGetFunding, promtDisplayHelp } from "./components";
import stakeTokens from "./components/stakeToken";
import { IGeneratedWallets } from "./types";
import { isGeneratedWallets } from "./typesGuardRuntime";
import { promises as fs } from 'fs';

const setup = async () => {

  await redisIOConnection.flushall()

  const secretsFile = 'config/secrets.json';
  if (process.argv.includes('--help')) {
    promtDisplayHelp();
    return;
  }
  await AppDataSource.initialize()
  let config: IChainSpecs = prodChainSpecs

  if (process.argv.includes('--testnet')) {
    config = testnetChainSpecs
  }

  let secrets: IGeneratedWallets = await readJsonFile(secretsFile)
  if (isGeneratedWallets(secrets)) {
    console.log("existing secrets found")
  } else {
    console.log("generating new secrets")
    secrets = generateWalletsForChains()
    await fs.writeFile(secretsFile, JSON.stringify(secrets));
  }

  if (await isStaked({ stakingConfig: config.stakingConfig, privateKey: secrets.evmWallet.privateKey })) {
    console.log("Stake found");
  } else {
    let isNotFullyFunded = true
    while (isNotFullyFunded) {
      try {
        isNotFullyFunded = await promptToGetFunding(secrets, config);
        console.log({ isNotFullyFunded })
      } catch (e) {
        await waitForMSWithMsg(5000, "Something went wrong")
        isNotFullyFunded = true
      }
      if (isNotFullyFunded)
        await waitForKeyPress("Press [Enter] key after funding your addresses");
    }
    let stakedTokens = false
    while (!stakedTokens) {
      try {
        console.log("Checking staked tokens")
        await stakeTokens({ stakingConfig: config.stakingConfig, privateKey: secrets.evmWallet.privateKey })
        stakedTokens = true;
      } catch (e) {
        console.log("Error on stakeTokens, orginal error:", e)
        await waitForMSWithMsg(5000, "Error staking XpNets")
      }
    }
  }
  console.log("HOW AM I??------------------------------------------------------------------")
  await runValidators({ config, secrets })
  console.log("THERE")
};

export { setup };
