import type { EntityManager } from "@mikro-orm/sqlite";
import {
  type TransactionEventsParser,
  type TransactionsConverter,
  findEventsByFirstTopic,
} from "@multiversx/sdk-core/out";
import type { INetworkProvider } from "@multiversx/sdk-network-providers/out/interface";
import type { Axios } from "axios";
import type { EventBuilder } from "../..";
import { Block } from "../../../persistence/entities/block";
import type { LockEventIter, LogInstance } from "../../types";
import type { Root } from "../types/gateway";

const CHAIN_IDENT = "MULTIVERSX";
const WAIT_TIME = 10000;

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: LockEventIter,
  lastBlock: number,
  bridge: string,
  gateway: Axios,
  provider: INetworkProvider,
  _gatewayURL: string,
  em: EntityManager,
  converter: TransactionsConverter,
  eventsParser: TransactionEventsParser,
  logger: LogInstance,
) {
  let lastBlock_ = lastBlock;
  while (true) {
    try {
      {
        const txs = (
          await gateway.get<Root>(
            `hyperblock/by-nonce/${lastBlock_.toString()}`,
          )
        ).data;

        const txsForBridge = txs.data.hyperblock.transactions.filter(
          (e) => e.function === "lock721" || e.function === "lock1155",
        );

        if (!txsForBridge.length) {
          logger.trace(`No TX Since: ${lastBlock_}. Awaiting 10s`);
          const lastestStatus = await provider.getNetworkStatus();
          const lastNonce = lastestStatus.HighestFinalNonce;
          lastBlock_ = lastBlock_ + 1;
          if (lastBlock >= lastNonce) {
            // Sleep for 2 minutes
            await new Promise<undefined>((e) => setTimeout(e, 2 * 60 * 1000));
            continue;
          }
          await em.upsert(Block, {
            chain: CHAIN_IDENT,
            contractAddress: bridge,
            lastBlock: Number(lastBlock_),
          });
          await em.flush();
          await new Promise<undefined>((e) => setTimeout(e, WAIT_TIME));
          continue;
        }
        for (const tx of txsForBridge) {
          const transactionOnNetworkMultisig = await provider.getTransaction(
            tx.hash,
          );
          const transactionOutcomeLock =
            converter.transactionOnNetworkToOutcome(
              transactionOnNetworkMultisig,
            );
          const [event] = findEventsByFirstTopic(
            transactionOutcomeLock,
            "Locked",
          );
          if (!event) continue;
          const parsed = eventsParser.parseEvent({ event });
          const destinationChain = parsed.destination_chain.toString("utf-8");
          const sourceChain = parsed.chain.toString("utf-8");
          const tokenId = parsed.token_id.toString();
          const tokenAmount = parsed.token_amount.toString();
          await cb(
            await builder.nftLocked(
              tokenId,
              destinationChain,
              parsed.destination_user_address.toString("utf-8"),
              parsed.source_nft_contract_address,
              tokenAmount,
              parsed.nft_type.toString("utf-8"),
              sourceChain,
              tx.hash,
              CHAIN_IDENT,
            ),
          );
        }
        lastBlock_ = lastBlock_ + 1;
        await em.upsert(Block, {
          chain: CHAIN_IDENT,
          contractAddress: bridge,
          lastBlock: Number(lastBlock_),
        });
        await em.flush();
      }
    } catch (e) {
      logger.error(`${e} while listening for events. Sleeping for 10 seconds`);
      await new Promise<undefined>((resolve) => setTimeout(resolve, WAIT_TIME));
    }
  }
}
