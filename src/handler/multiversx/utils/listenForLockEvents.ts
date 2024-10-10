import { setTimeout } from "node:timers/promises";
import type { EntityManager } from "@mikro-orm/sqlite";
import {
  type TransactionEventsParser,
  type TransactionsConverter,
  findEventsByFirstTopic,
} from "@multiversx/sdk-core/out";
import { ApiNetworkProvider } from "@multiversx/sdk-network-providers/out";
import { Axios } from "axios";
import { Block } from "../../../persistence/entities/block";
import type { EventBuilder } from "../../event-builder";
import { tryRerunningFailed } from "../../poller/utils";
import type { LockEventIter, LogInstance } from "../../types";
import { useMutexAndRelease } from "../../utils";
import type { MXProviderFetch } from "../types";
import type { Transaction } from "../types/gateway";

const CHAIN_IDENT = "MULTIVERSX";
const WAIT_TIME = 10000;

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: LockEventIter,
  lastBlock: number,
  bridge: string,
  provider: MXProviderFetch,
  gatewayURL: string,
  em: EntityManager,
  converter: TransactionsConverter,
  eventsParser: TransactionEventsParser,
  logger: LogInstance,
) {
  const waitForTx = async (hash: string) => {
    let retries = 10;
    let transactionOnNetworkMultisig = await useMutexAndRelease(
      provider,
      async (p) => await p.getTransactionStatus(hash),
    );
    while (retries > 0) {
      if (transactionOnNetworkMultisig.isSuccessful()) {
        return;
      }
      logger.trace(
        `TX: ${hash} status: ${transactionOnNetworkMultisig.toString()}`,
      );
      await setTimeout(1000);
      transactionOnNetworkMultisig = await useMutexAndRelease(
        provider,
        async (p) => await p.getTransactionStatus(hash),
      );
      retries -= 1;
    }
  };
  const apin = new ApiNetworkProvider(gatewayURL.replace("gateway", "api"));
  let lastBlock_ = lastBlock;
  const apiax = new Axios({
    baseURL: gatewayURL.replace("gateway", "api"),
  });
  while (true) {
    await tryRerunningFailed(CHAIN_IDENT, em, builder, cb, logger);
    try {
      {
        const response = (
          await apiax.get<string>(
            `/transactions?status=success&receiver=${bridge}&after=${lastBlock_}&order=asc`,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            },
          )
        ).data;
        const txs: [Transaction] = JSON.parse(
          JSON.stringify(response) as string,
        );

        const txsForBridge = txs.filter(
          (e) => e.function === "lock721" || e.function === "lock1155",
        );

        if (!txsForBridge.length) {
          logger.info(
            `No TX Since: ${lastBlock_}. Awaiting ${WAIT_TIME / 1000}s`,
          );
          // await em.upsert(Block, {
          //   chain: CHAIN_IDENT,
          //   contractAddress: bridge,
          //   lastBlock: Number(lastBlock_),
          // });
          // await em.flush();
          await setTimeout(WAIT_TIME);
          continue;
        }
        logger.info(`Found ${txsForBridge.length} TXs after ${lastBlock_}ms`);
        for (const tx of txsForBridge) {
          logger.trace(`Waiting for TX Completion: ${tx.txHash}`);
          await waitForTx(tx.txHash);
          logger.trace(`TX Completed: ${tx.txHash}`);
          const txo = await useMutexAndRelease(
            provider,
            async (p) => await p.getTransaction(tx.txHash),
          );
          const transactionOnNetworkMultisig = await apin.getTransaction(
            txo.contractResults.items[0].hash,
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
          const metaDataUri = parsed.metadata_uri.toString();
          await cb(
            await builder.nftLocked(
              tokenId,
              destinationChain,
              parsed.destination_user_address.toString("utf-8"),
              parsed.source_nft_contract_address,
              tokenAmount,
              parsed.nft_type.toString("utf-8"),
              sourceChain,
              tx.txHash,
              CHAIN_IDENT,
              metaDataUri,
            ),
          );
        }
        lastBlock_ = txsForBridge[txsForBridge.length - 1].timestamp + 1;
        await em.upsert(Block, {
          chain: CHAIN_IDENT,
          contractAddress: bridge,
          lastBlock: Number(lastBlock_),
        });
        await em.flush();
      }
    } catch (e) {
      //@ts-ignore
      logger.error(
        `While listening for events. Awaiting ${WAIT_TIME / 1000}s`,
        e,
      );
      await setTimeout(WAIT_TIME);
    }
  }
}
