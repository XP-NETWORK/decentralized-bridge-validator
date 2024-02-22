import chalk from "chalk";

export default function SecretLog(msg: string) {
  console.log(chalk.red("SECRET:\t\t"), msg);
}
