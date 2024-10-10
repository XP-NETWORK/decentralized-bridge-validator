import { setTimeout } from "node:timers/promises";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { TransactionEvent } from "@multiversx/sdk-network-providers/out";
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
        const txs: Transaction[] = JSON.parse(
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
          let event: TransactionEvent[] = [];

          for (const contractEvent of txo.logs.events) {
            if (contractEvent.topics[0].toString() === "Locked") {
              event = [contractEvent];
            }

            if (event.length) break;
          }
          if (!event.length) {
            for (const subTx of txo.contractResults.items) {
              try {
                event = subTx.logs.events.filter((e) => {
                  return e.topics[0].toString() === "Locked";
                });
                if (event.length) break;
              } catch (ex) {}
            }
          }

          if (!event) continue;

          const parsed = event[0];

          const tokenId = Number.parseInt(
            parsed.topics[1].hex(),
            16,
          ).toString();
          const destinationChain = parsed.topics[2].toString();
          const destinationUserAddress = Buffer.from(
            parsed.topics[3].hex(),
            "hex",
          ).toString();
          const sourceNftContractAddress = parsed.topics[4].toString();
          const tokenAmount = parsed.topics[5].valueOf()[0].toString();
          const nftType = parsed.topics[6].toString();
          const sourceChain = parsed.topics[7].toString();
          const metadataUri = parsed.topics[8].toString();

          await cb(
            await builder.nftLocked(
              tokenId,
              destinationChain,
              destinationUserAddress,
              sourceNftContractAddress,
              tokenAmount,
              nftType,
              sourceChain,
              tx.txHash,
              CHAIN_IDENT,
              metadataUri,
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
