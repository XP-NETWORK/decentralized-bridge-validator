import { EntityManager } from "@mikro-orm/sqlite";
import {
  TransactionEventsParser,
  TransactionsConverter,
  findEventsByFirstTopic,
} from "@multiversx/sdk-core/out";
import { INetworkProvider } from "@multiversx/sdk-network-providers/out/interface";
import { Axios } from "axios";
import { EventBuilder } from "../..";
import { Block } from "../../../persistence/entities/block";
import { LockEventIter } from "../../types";
import { Root } from "../types/gateway";
import MxLog from "./log";

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
          MxLog(
            `No Transactions found in chain from block: ${lastBlock_}. Waiting for 10 Seconds before looking for new transactions`,
          );
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
          const parsed = eventsParser.parseEvent({ event });
          const destinationChain = parsed.destination_chain.toString("utf-8");
          const sourceChain = parsed.chain.toString("utf-8");
          const tokenId = parsed.token_id.toString();
          const tokenAmount = parsed.token_amount.toString();
          await cb(
            builder.nftLocked(
              tokenId,
              destinationChain,
              parsed.destination_user_address.toString("utf-8"),
              parsed.source_nft_contract_address,
              tokenAmount,
              parsed.nft_type.toString("utf-8"),
              sourceChain,
              tx.hash,
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
      MxLog(`${e} while listening for events. Sleeping for 10 seconds`);
      await new Promise<undefined>((resolve) => setTimeout(resolve, WAIT_TIME));
    }
  }
}
