import { EntityManager } from "@mikro-orm/sqlite";
import { JsonRpcProvider } from "ethers";

import { TSupportedChains } from "../../config";

import { TStakingHandler } from "../types";
import { listenForStakingEvents } from "./utils";

export function evmStakingHandler(
  chainIdent: TSupportedChains,
  provider: JsonRpcProvider,
  lastBlock_: number,
  blockChunks: number,
  em: EntityManager,
  staker: string,
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
      )(builder, cb),
  };
}
