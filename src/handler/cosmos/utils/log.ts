import chalk from "chalk";

export default function CosmWasmLog(identifier: string, ...msg: unknown[]) {
  console.log(chalk.hex("#7954FF")(`${identifier}:\t\t`), chalk(...msg));
}
