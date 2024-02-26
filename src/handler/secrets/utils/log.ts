import chalk from "chalk";

export default function SecretLog(...msg: unknown[]) {
  console.log(chalk.red("SECRET:\t\t"), ...msg);
}
