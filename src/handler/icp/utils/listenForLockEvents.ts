import { setTimeout } from "node:timers/promises";
import { Actor, type ActorSubclass } from "@dfinity/agent";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { EventBuilder } from "../..";
import type { _SERVICE } from "../../../contractsTypes/icp/bridge/bridge.types";
import { Block } from "../../../persistence/entities/block";
import type { LockEventIter, LogInstance } from "../../types";

const CHAIN_IDENT = "ICP";

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: LockEventIter,
  lastBlock_: number,
  bc: ActorSubclass<_SERVICE>,
  em: EntityManager,
  logger: LogInstance,
) {
  let lastBlock = lastBlock_;
  while (true)
    try {
      {
        const latestBlockNumberResponse = await bc.get_nonce();
        const latestBlockNumber = Number(latestBlockNumberResponse);

        if (latestBlockNumber <= lastBlock) {
          logger.trace(`0 TXs since Last Nonce: ${lastBlock}. Awaiting 10s`);
          await setTimeout(10000);
          continue;
        }
        logger.info(`Found ${latestBlockNumber - lastBlock} new TXs`);
        const [hash] = await bc.get_hash_from_nonce(BigInt(lastBlock));
        if (!hash) continue;
        const [log] = await bc.get_locked_data(hash);
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
          ),
        );
      }
      await em.upsert(Block, {
        chain: CHAIN_IDENT,
        contractAddress: Actor.canisterIdOf(bc).toString(),
        lastBlock: lastBlock,
      });
      await em.flush();
    } catch (e) {
      logger.error(`${e} while listening for events. Sleeping for 10 seconds`);
      await setTimeout(10000);
    }
}
