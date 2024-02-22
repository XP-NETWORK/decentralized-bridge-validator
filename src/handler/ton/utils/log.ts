import chalk from "chalk";

export default function TonLog(msg: string) {
  console.log(chalk.blue("TON:\t\t"), msg);
}
