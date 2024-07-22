import type { Aptos } from "@aptos-labs/ts-sdk";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { EventBuilder } from "../..";
import { Block } from "../../../persistence/entities/block";
import type { LockEventIter } from "../../types";
import { BRIDGE_MODULE_NAME } from "../constants";
import log from "./log";

const CHAIN_IDENT = "APTOS";
const LOCK_EVENT = "LockedEvent";

const listenForLockEvents = async (
  builder: EventBuilder,
  cb: LockEventIter,
  lastTransaction_: number,
  client: Aptos,
  bridge: string,
  em: EntityManager,
) => {
  let lastTransaction = lastTransaction_;

  while (true) {
    try {
      const latestTransaction = lastTransaction + 100000;
      const events = await client.getEvents({
        options: {
          where: {
            type: {
              _eq: `${bridge}::${BRIDGE_MODULE_NAME}::${LOCK_EVENT}`,
            },
            transaction_version: {
              _gte: lastTransaction,
              _lt: latestTransaction,
            },
          },
        },
      });

      if (!events.length) {
        log(
          `No Transactions found in chain from transaction number: ${lastTransaction} to ${latestTransaction}. Waiting for 10 Seconds before looking for new transactions`,
        );

        lastTransaction = latestTransaction;

        await em.upsert(Block, {
          chain: CHAIN_IDENT,
          contractAddress: bridge,
          lastBlock: lastTransaction,
        });
        await em.flush();
        await new Promise<undefined>((e) => setTimeout(e, 10000));
        continue;
      }

      for (const event of events) {
        const tokenId = event.data.token_id;
        const userAddress = event.data.destination_user_address;
        const sourceNftContractAddress = event.data.collection_address;
        const tokenAmount = event.data.token_amount;
        const nftType = bufferHexStrToString(event.data.nft_type);
        const sourceChain = bufferHexStrToString(event.data.self_chain);
        const destinationChain = bufferHexStrToString(
          event.data.destination_chain,
        );
        const transactionHash = event.transaction_version;

        await cb(
          await builder.nftLocked(
            tokenId,
            destinationChain,
            userAddress,
            sourceNftContractAddress,
            tokenAmount,
            nftType,
            sourceChain,
            transactionHash,
            CHAIN_IDENT,
          ),
        );
      }

      lastTransaction = latestTransaction;

      await em.upsert(Block, {
        chain: CHAIN_IDENT,
        contractAddress: bridge,
        lastBlock: lastTransaction,
      });
      await em.flush();
    } catch (e) {
      log(`${e} while listening for events. Sleeping for 10 seconds`);
      await new Promise<undefined>((resolve) => setTimeout(resolve, 10000));
    }
  }
};

function bufferHexStrToString(str: string): string {
  return Buffer.from(str.slice(2), "hex").toString("utf-8");
}

export default listenForLockEvents;
