import { setTimeout } from "node:timers/promises";
import type { ActorSubclass } from "@dfinity/agent";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { EventBuilder } from "../..";
import type { _SERVICE } from "../../../contractsTypes/icp/bridge/bridge.types";
import { Block } from "../../../persistence/entities/block";
import { tryRerunningFailed } from "../../poller/utils";
import type { LockEventIter, LogInstance } from "../../types";
import { useMutexAndRelease } from "../../utils";

const CHAIN_IDENT = "ICP";

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: LockEventIter,
  lastBlock_: number,
  fetchBridge: () => Promise<readonly [ActorSubclass<_SERVICE>, () => void]>,
  bc: string,
  em: EntityManager,
  logger: LogInstance,
) {
  try {
    await tryRerunningFailed(CHAIN_IDENT, em, cb);
  } catch (e) {
    logger.info(
      "Error While trying to process previous failed events. Sleeping for 10 seconds",
      e,
    );
  }
  let lastBlock = lastBlock_;
  while (true)
    try {
      {
        // let [bridge, release] = await fetchBridge();
        const latestBlockNumberResponse = await useMutexAndRelease(
          fetchBridge,
          async (bridge) => await bridge.get_nonce(),
        );
        // release();
        const latestBlockNumber = Number(latestBlockNumberResponse);

        if (latestBlockNumber <= lastBlock) {
          logger.trace(`0 TXs since Last Nonce: ${lastBlock}. Awaiting 10s`);
          await setTimeout(10000);
          continue;
        }
        logger.info(`Found ${latestBlockNumber - lastBlock} new TXs`);
        const [hash] = await useMutexAndRelease(fetchBridge, async (bridge) => {
          return await bridge.get_hash_from_nonce(BigInt(lastBlock));
        });
        if (!hash) continue;
        const [log] = await useMutexAndRelease(
          fetchBridge,
          async (bridge) => await bridge.get_locked_data(hash),
        );
        if (!log) continue;
        lastBlock = lastBlock + 1;
        const {
          destination_chain,
          destination_user_address,
          nft_type,
          source_chain,
          source_nft_contract_address,
          token_amount,
          token_id,
        } = log;
        await cb(
          await builder.nftLocked(
            token_id.toString(),
            destination_chain,
            destination_user_address,
            source_nft_contract_address.toString(),
            token_amount.toString(),
            nft_type,
            source_chain,
            hash,
            CHAIN_IDENT,
            "",
          ),
        );
      }
      await em.upsert(Block, {
        chain: CHAIN_IDENT,
        contractAddress: bc,
        lastBlock: lastBlock,
      });
      await em.flush();
    } catch (e) {
      logger.error(`${e} while listening for events. Sleeping for 10 seconds`);
      await setTimeout(10000);
    }
}
