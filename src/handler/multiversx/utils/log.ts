import chalk from "chalk";

export default function MxLog(...msg: unknown[]) {
  console.log(chalk.blueBright("MULTIVERSX:\t"), ...msg);
}
