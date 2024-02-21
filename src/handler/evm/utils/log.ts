import chalk from "chalk";
import { TSupportedChains } from "../../../config";

const log = (msg: string, chainIdent: TSupportedChains) => {
  console.log(chalk.green(`EVM: ${chainIdent}\t`), msg);
};

export default log;
