import chalk from "chalk";

export default function TonLog(...msg: unknown[]) {
  console.log(chalk.blue("TON:\t\t"), ...msg);
}
