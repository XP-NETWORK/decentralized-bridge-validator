import { config } from "dotenv";
import { z } from "zod";
import type { LogInstance } from "./handler/types";

config();

export const Env = z.object({
  TON_API_KEY: z.string().optional(),
  SERVER_PORT: z.string().optional(),
  SERVER_LINK: z.string().optional(),
});
export type Env = z.infer<typeof Env>;

export async function configureValidator(log: LogInstance) {
  const environment = Env.safeParse(process.env);

  if (!environment.success) {
    log.error("Environment is invalid!");
    process.exit(1);
  }
}
declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
