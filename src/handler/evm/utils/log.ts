import chalk from "chalk";

const EvmLog = (chainIdent: string, ...msg: unknown[]) => {
  console.log(chalk.green(`EVM: ${chainIdent}\t`), msg);
};

export default EvmLog;
