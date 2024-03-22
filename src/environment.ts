import { config } from "dotenv";
import { z } from "zod";
import { ValidatorLog } from "./handler/utils";

config();

export const Env = z.object({
  TON_API_KEY: z.string(),
});

export type Env = z.infer<typeof Env>;

const environment = Env.safeParse(process.env);

if (!environment.success) {
  ValidatorLog("Environment is invalid!");
  process.exit(1);
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
