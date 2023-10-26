import { getRedisConnection } from "@src/utils";
import { prodBridgeConfig, testnetBridgeConfig } from "@src/config/chainSpecs";
import { AppDataSource } from "@src/db/data-source";
import { runValidators } from "@src/modules/validator";
import { addSelfInBridges, generateWalletsForChains, getInitialFunds, isStaked, promtDisplayHelp } from "./components";
import { stakeTokens } from "./components";
import { IBridgeConfig, IGeneratedWallets } from "@src/types";

const setup = async () => {

  // help promt
  if (process.argv.includes('--help')) {
    promtDisplayHelp();
    return;
  }

  // Initialize Databases
  await AppDataSource.initialize()
  await getRedisConnection().flushall()

  // Setup Configs
  let config: IBridgeConfig = prodBridgeConfig
  if (process.argv.includes('--testnet')) {
    config = testnetBridgeConfig
    console.log("-------------------------- Running in testnet --------------------------------")
  }

  // Generate wallets
  const wallets: IGeneratedWallets = await generateWalletsForChains()

  // Check if staked then contininue else get initial funding and stake
  if (await isStaked({ stakingChainConfig: config.stakingConfig, evmWallet: wallets.evmWallet })) {
    console.log("Stake found");
  } else {

    await getInitialFunds({ wallets, config });
    await stakeTokens({ stakingChainConfig: config.stakingConfig, evmWallet: wallets.evmWallet })
  }

  await addSelfInBridges({ config, wallets });

  // Run the validators
  await runValidators({ config, wallets })
};

export { setup };