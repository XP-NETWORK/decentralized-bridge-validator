import type { EntityManager } from "@mikro-orm/sqlite";
import { Address } from "@ton/ton";
import { isAxiosError } from "axios";
import { raise } from "..";
import type { EventBuilder } from "../..";
import { loadLockedEvent } from "../../../contractsTypes/ton/tonBridge";
import { Block } from "../../../persistence/entities/block";
import { tryRerunningFailed } from "../../poller/utils";
import type { LockEventIter, LogInstance } from "../../types";
import { useMutexAndRelease } from "../../utils";
import type { TONProviderFetch } from "../types";

const CHAIN_IDENT = "TON";

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: LockEventIter,
  lastBlock_: number,
  fetchClient: TONProviderFetch,
  bridge: string,
  em: EntityManager,
  logger: LogInstance,
) {
  let lastBlock = Number(lastBlock_);
  while (true) {
    try {
      await tryRerunningFailed(CHAIN_IDENT, em, builder, cb, logger);
      const latestTx = await useMutexAndRelease(
        fetchClient,
        async (p) =>
          await p.getTransactions(Address.parseFriendly(bridge).address, {
            limit: 1,
          }),
      );
      if (Number(latestTx[0].lt) === lastBlock) {
        logger.info(
          ` ${lastBlock} -> ${latestTx[0].lt.toString()}: 0 TXs. Awaiting 10s`,
        );
        await new Promise<undefined>((e) => setTimeout(e, 10000));
        continue;
      }
      const transactions = await useMutexAndRelease(
        fetchClient,
        async (p) =>
          await p.getTransactions(Address.parseFriendly(bridge).address, {
            limit: 100,
            lt: lastBlock.toString(),
            to_lt: latestTx[0].lt.toString(),
            inclusive: true,
          }),
      );

      if (!transactions.length) {
        logger.info(
          ` ${lastBlock} -> ${latestTx[0].lt.toString()}: 0 TXs. Awaiting 10s`,
        );
        await new Promise<undefined>((e) => setTimeout(e, 10000));
        lastBlock = Number(latestTx[0].lt);
        await em.upsert(Block, {
          chain: CHAIN_IDENT,
          contractAddress: bridge,
          lastBlock: lastBlock,
        });
        continue;
      }
      for (const tx of transactions) {
        for (let i = 0; i < tx.outMessages.size; i++) {
          const log = tx.outMessages.get(i) ?? raise("Unreachable");
          // if its not the lock nft event we early return
          if (
            log.body.bits.length <= 0 ||
            log.body.asSlice().loadUint(32) !== 2105076052
          ) {
            continue;
          }
          const {
            tokenId, // Unique ID for the NFT transfer
            destinationChain, // Chain to where the NFT is being transferred
            destinationUserAddress, // User's address in the destination chain
            sourceNftContractAddress, // Address of the NFT contract in the source chain
            tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
            nftType, // Sigular or multiple ( 721 / 1155)
            sourceChain, // Source chain of NFT
            metaDataUri,
          } = loadLockedEvent(log.body.asSlice());

          const getSourceNftContractAddress = () => {
            try {
              return sourceNftContractAddress
                .asSlice()
                .loadAddress()
                .toString();
            } catch (e) {
              return sourceNftContractAddress.asSlice().loadStringTail();
            }
          };

          await cb(
            await builder.nftLocked(
              tokenId.toString(),
              destinationChain.asSlice().loadStringRefTail(),
              destinationUserAddress.asSlice().loadStringRefTail(),
              getSourceNftContractAddress(),
              tokenAmount.toString(),
              nftType,
              sourceChain,
              Buffer.from(tx.hash()).toString("base64"),
              CHAIN_IDENT,
              metaDataUri.asSlice().loadStringRefTail(),
            ),
          );
        }
      }
      lastBlock = Number(transactions[0].lt);
      await em.upsert(Block, {
        chain: CHAIN_IDENT,
        contractAddress: bridge,
        lastBlock: lastBlock,
      });
    } catch (e) {
      if (isAxiosError(e)) {
        logger.error(
          "Error while listening for ton events. Sleeping for 10 seconds. Reason:",
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          e.response!.data.error,
        );
      } else {
        logger.error(
          "While listening for ton events. Sleeping for 10 seconds",
          e,
        );
      }
      await new Promise<undefined>((resolve) => setTimeout(resolve, 10000));
    }
  }
}
