import { EntityManager } from "@mikro-orm/sqlite";
import { JsonRpcProvider } from "ethers";

import { TSupportedChains } from "../../config";

import { LogInstance, TStakingHandler } from "../types";
import { listenForStakingEvents } from "./utils";

export function evmStakingHandler(
  chainIdent: TSupportedChains,
  provider: JsonRpcProvider,
  lastBlock_: number,
  blockChunks: number,
  em: EntityManager,
  staker: string,
  logger: LogInstance,
): TStakingHandler {
  return {
    listenForStakingEvents: (builder, cb) =>
      listenForStakingEvents(
        provider,
        lastBlock_,
        staker,
        blockChunks,
        chainIdent,
        em.fork(),
        logger,
      )(builder, cb),
  };
}
