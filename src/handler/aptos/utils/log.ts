import chalk from "chalk";

export default function AptosLog(...msg: unknown[]) {
  console.log(chalk.black("TEZOS:\t\t"), ...msg);
}
