import chalk from "chalk";

export default function MxLog(msg: string) {
  console.log(chalk.blueBright("MULTIVERSX:\t"), msg);
}
