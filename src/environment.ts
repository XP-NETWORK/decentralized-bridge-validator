import { config } from "dotenv";
import { z } from "zod";
import type { LogInstance } from "./handler/types";

config();

export const Env = z.object({
  TON_API_KEY: z.string().optional(),
  NEARBLOCKS_API_KEY: z.string().optional(),
  SERVER_PORT: z.string().optional(),
  SERVER_LINK: z.string().optional(),
  NETWORK: z.union([z.literal("testnet"), z.literal("mainnet"), z.undefined()]),
  OPT_RPC: z.string().optional(),
  BSC_RPC: z.string().optional(),
  BASE_RPC: z.string().optional(),
  MATIC_RPC: z.string().optional(),
  HEDERA_RPC: z.string().optional(),
  TON_RPC: z.string().optional(),
  TEZOS_RPC: z.string().optional(),
  FANTOM_RPC: z.string().optional(),
  AVALANCHE_RPC: z.string().optional(),
  MOONBEAM_RPC: z.string().optional(),
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
