import { setTimeout } from "node:timers/promises";
import type { EntityManager } from "@mikro-orm/sqlite";
import {
  type TransactionEventsParser,
  type TransactionsConverter,
  findEventsByFirstTopic,
} from "@multiversx/sdk-core/out";
import { ApiNetworkProvider } from "@multiversx/sdk-network-providers/out";
import type { Axios } from "axios";
import { Block } from "../../../persistence/entities/block";
import type { EventBuilder } from "../../event-builder";
import { tryRerunningFailed } from "../../poller/utils";
import type { LockEventIter, LogInstance } from "../../types";
import { useMutexAndRelease } from "../../utils";
import type { MXProviderFetch } from "../types";
import type { Root } from "../types/gateway";

const CHAIN_IDENT = "MULTIVERSX";
const WAIT_TIME = 10000;

function generateWaitTime(num1: number, num2: number) {
  const difference = Math.abs(num1 - num2);
  const maxDifference = 1000;
  const score =
    3 * (1 - Math.min(difference, maxDifference) / maxDifference) + 1;
  return Math.round(score * 10) / 10;
}

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: LockEventIter,
  lastBlock: number,
  bridge: string,
  gateway: Axios,
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
  while (true) {
    await tryRerunningFailed(CHAIN_IDENT, em, builder, cb, logger);
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
          const lastestStatus = await useMutexAndRelease(
            provider,
            async (p) => await p.getNetworkStatus(),
          );
          const lastNonce = lastestStatus.HighestFinalNonce;
          const wt = generateWaitTime(lastBlock_, lastNonce);
          logger.info(
            `No TX Since: ${lastBlock_}. Awaiting ${Math.round(wt)}s`,
          );
          lastBlock_ = lastBlock_ + 1;
          if (lastBlock_ >= lastNonce) {
            await setTimeout(30 * 1000); // 30 seconds
            continue;
          }
          await em.upsert(Block, {
            chain: CHAIN_IDENT,
            contractAddress: bridge,
            lastBlock: Number(lastBlock_),
          });
          await em.flush();
          await setTimeout(wt * 1000);
          continue;
        }
        logger.info(`Found ${txsForBridge.length} TXs in ${lastBlock_ - 1}`);
        for (const tx of txsForBridge) {
          logger.trace(`Waiting for TX Completion: ${tx.hash}`);
          await waitForTx(tx.hash);
          logger.trace(`TX Completed: ${tx.hash}`);
          if (!(tx.type === "normal")) continue;
          const txo = await useMutexAndRelease(
            provider,
            async (p) => await p.getTransaction(tx.hash),
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
              "",
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
      await setTimeout(WAIT_TIME);
    }
  }
}
