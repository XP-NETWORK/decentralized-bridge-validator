import { setTimeout } from "node:timers/promises";
import type { Aptos } from "@aptos-labs/ts-sdk";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { EventBuilder } from "../../event-builder";
import type { LockEventIter, LogInstance } from "../../types";

//@ts-ignore
const CHAIN_IDENT = "APTOS";

export default async function listenForLockEvents(
  _builder: EventBuilder,
  _cb: LockEventIter,
  _lastBlock_: number,
  _fetchBridge: () => Promise<readonly [Aptos, () => void]>,
  bridge: string,
  _em: EntityManager,
  logger: LogInstance,
) {
  // let lastBlock = lastBlock_;
  while (true) {
    const [provider, release] = await _fetchBridge();
    const events = await provider.getEvents({
      options: {
        where: {
          account_address: {
            _eq: bridge,
          },
        },
      },
    });
    release();
    logger.info(events);
    await setTimeout(2000);
    //   try {
    // await tryRerunningFailed(CHAIN_IDENT, em, builder, cb, logger);
    // const latestBlockNumberResponse = await useMutexAndRelease(
    //   fetchBridge,
    //   async (bridge) => await bridge.get_nonce(),
    // );
    // const latestBlockNumber = Number(latestBlockNumberResponse);
    // if (latestBlockNumber <= lastBlock) {
    //   logger.info(`0 TXs since Last Nonce: ${lastBlock}. Awaiting 10s`);
    //   await setTimeout(10000);
    //   continue;
    // }
    // logger.info(`Found ${latestBlockNumber - lastBlock} new TXs`);
    // const [hash] = await useMutexAndRelease(fetchBridge, async (bridge) => {
    //   return await bridge.get_hash_from_nonce(BigInt(lastBlock));
    // });
    // if (!hash) continue;
    // const [log] = await useMutexAndRelease(
    //   fetchBridge,
    //   async (bridge) => await bridge.get_locked_data(hash),
    // );
    // if (!log) continue;
    // lastBlock = lastBlock + 1;
    // const {
    //   destination_chain,
    //   destination_user_address,
    //   nft_type,
    //   source_chain,
    //   source_nft_contract_address,
    //   token_amount,
    //   token_id,
    // } = log;
    // await cb(
    //   await builder.nftLocked(
    //     token_id.toString(),
    //     destination_chain,
    //     destination_user_address,
    //     source_nft_contract_address.toString(),
    //     token_amount.toString(),
    //     nft_type,
    //     source_chain,
    //     hash,
    //     CHAIN_IDENT,
    //     "",
    //   ),
    // );
    // await em.upsert(Block, {
    //   chain: CHAIN_IDENT,
    //   contractAddress: bc,
    //   lastBlock: lastBlock,
    // });
    //   // await em.flush();
    // } catch (e) {
    //   logger.error(`${e} while listening for events. Sleeping for 10 seconds`);
    //   await setTimeout(10000);
  }
}
