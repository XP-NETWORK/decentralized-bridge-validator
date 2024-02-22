import chalk from "chalk";

export default function TezosLog(...msg: unknown[]) {
  console.log(chalk.yellow("TEZOS:\t\t"), ...msg);
}
