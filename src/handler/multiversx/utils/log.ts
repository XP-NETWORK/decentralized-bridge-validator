import chalk from "chalk";

export default function MxLog(...msg: unknown[]) {
  console.log(chalk.hex("#00FF00")("MULTIVERSX:\t"), ...msg);
}
