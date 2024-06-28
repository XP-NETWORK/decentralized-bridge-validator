import chalk from "chalk";

export default function AptosLog(msg: string) {
  console.log(chalk.cyan("APTOS:\t"), msg);
}
