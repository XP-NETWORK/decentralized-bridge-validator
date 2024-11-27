import type { CasperClient } from "casper-js-sdk";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export const getDeploy = async (client: CasperClient, deployHash: string) => {
  let i = 300;
  while (i !== 0) {
    try {
      const [_, raw] = await client.getDeploy(deployHash);
      //@ts-ignore
      if (raw.execution_results.length !== 0) {
        // @ts-ignore
        if (raw.execution_results[0].result.Success) {
          return raw;
          // biome-ignore lint/style/noUselessElse: <explanation>
        } else {
          // @ts-ignore
          throw Error(
            //@ts-ignore
            `Contract execution: ${raw.execution_results[0].result.Failure.error_message}`,
          );
        }
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        i--;
        await sleep(4000);
        // biome-ignore lint/correctness/noUnnecessaryContinue: <explanation>
        continue;
      }
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (e: any) {
      console.log(e.message);
      if (e.message.match(/(deploy not known|no such deploy)/gim)) {
        i--;
        await sleep(4000);
        // biome-ignore lint/correctness/noUnnecessaryContinue: <explanation>
        continue;
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        throw e;
      }
    }
  }
  // biome-ignore lint/style/useTemplate: <explanation>
  throw Error("Timeout after " + i + "s. Something's wrong");
};
