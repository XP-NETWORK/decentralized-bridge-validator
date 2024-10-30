import type { EntityManager } from "@mikro-orm/sqlite";
import { JsonRpcProvider } from "ethers";
import type { TSupportedChains } from "../../config";
import { Block } from "../../persistence/entities/block";
import type { IStakingConfig } from "../../types";
import type { LogInstance } from "../types";
import { evmStakingHandler } from "./stakingHandler";

export async function configStakingHandler(
  em: EntityManager,
  conf: IStakingConfig,
  logger: LogInstance,
) {
  const lb = await em.findOne(Block, {
    chain: conf.chain,
    contractAddress: conf.contractAddress,
  });
  return evmStakingHandler(
    conf.chain as TSupportedChains,
    new JsonRpcProvider(conf.rpcURL),
    lb?.lastBlock ?? conf.lastBlock,
    conf.blockChunks,
    em.fork(),
    conf.contractAddress,
    logger,
  );
}
