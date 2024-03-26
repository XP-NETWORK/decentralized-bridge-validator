import chalk from "chalk";

export default function CosmosLog(...msg: unknown[]) {
  console.log(chalk.hex("#A020F0")("COSMOS:\t\t"), ...msg);
}
