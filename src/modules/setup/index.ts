import { prodChainConfigs, testnetChainConfigs } from "../../config/chainSpecs";
import { IBridgeConfig } from "../../config/types";
import { AppDataSource } from "../../db/data-source";
import { runValidators } from "../validator";
import { redisIOConnection } from "../../utils";
import { addSelfInBridges, generateWalletsForChains, getInitialFunds, isStaked, promtDisplayHelp } from "./components";
import { stakeTokens } from "./components";
import { IGeneratedWallets } from "./types";

const setup = async () => {

  // help promt
  if (process.argv.includes('--help')) {
    promtDisplayHelp();
    return;
  }

  // Initialize Databases
  await AppDataSource.initialize()
  await redisIOConnection.flushall()

  // Setup Configs
  let config: IBridgeConfig = prodChainConfigs
  if (process.argv.includes('--testnet')) {
    config = testnetChainConfigs
    console.log("-------------------------- Running in testnet --------------------------------")
  }

  // Generate wallets
  const wallets: IGeneratedWallets = await generateWalletsForChains()

  // Check if staked then contininue else get initial funding and stake
  if (await isStaked({ stakingConfig: config.stakingConfig, privateKey: wallets.evmWallet.privateKey })) {
    console.log("Stake found");
  } else {
    await getInitialFunds({ wallets, config });
    await stakeTokens({ stakingConfig: config.stakingConfig, privateKey: wallets.evmWallet.privateKey })
  }

  await addSelfInBridges({ config, wallets });

  // Run the validators
  await runValidators({ config, wallets })
};

export { setup };
