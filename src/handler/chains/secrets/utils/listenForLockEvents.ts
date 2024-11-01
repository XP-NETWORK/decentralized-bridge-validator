import type { EntityManager } from "@mikro-orm/sqlite";
import { Block } from "../../../../persistence/entities/block";
import type { EventBuilder } from "../../../event-builder";
import { tryRerunningFailed } from "../../../poller/utils";
import type { LockEventIter, LogInstance } from "../../../types";
import { useMutexAndRelease } from "../../../utils";
import type { SecretProviderFetch } from "../types";

const CHAIN_IDENT = "SECRET";

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: LockEventIter,
  lastBlock_: number,
  fetchProvider: SecretProviderFetch,
  blockChunks: number,
  bridge: string,
  em: EntityManager,
  logger: LogInstance,
) {
  let lastBlock = lastBlock_;
  while (true)
    try {
      await tryRerunningFailed(CHAIN_IDENT, em, builder, cb, logger);
      // let [c, release] = await fetchProvider();
      {
        const latestBlockNumberResponse = await useMutexAndRelease(
          fetchProvider,
          async (c) => await c.query.tendermint.getLatestBlock({}),
        );
        const latestBlockNumber = Number(
          latestBlockNumberResponse.block?.header?.height,
        );
        // release();

        const latestBlock =
          lastBlock + blockChunks < latestBlockNumber
            ? lastBlock + blockChunks
            : latestBlockNumber;

        const query = `message.contract_address = '${bridge}' AND tx.height >= ${lastBlock} AND tx.height < ${latestBlock}`;
        const logs = await useMutexAndRelease(
          fetchProvider,
          async (c) => await c.query.txsQuery(query),
        );
        const startBlock = lastBlock;
        lastBlock = latestBlockNumber;
        if (!logs.length) {
          logger.info(
            `${startBlock} -> ${latestBlockNumber}: 0 TXs. Awaiting 10s`,
          );
          lastBlock = latestBlockNumber;
          await em.upsert(Block, {
            chain: CHAIN_IDENT,
            contractAddress: bridge,
            lastBlock: lastBlock,
          });
          await em.flush();
          await new Promise<undefined>((e) => setTimeout(e, 10000));
          continue;
        }
        for (const log of logs) {
          const logToFind = log?.jsonLog
            ?.at(0)
            ?.events.find((item: { type: string }) => item.type === "wasm")
            ?.attributes.find(
              (item: { key: string }) => item.key === "LockedEventInfo",
            );
          if (!logToFind) continue;
          const parsedLog = JSON.parse(logToFind.value);
          const {
            token_id: tokenId, // Unique ID for the NFT transfer
            destination_chain: destinationChain, // Chain to where the NFT is being transferred
            destination_user_address: destinationUserAddress, // User's address in the destination chain
            source_nft_contract_address: sourceNftContractAddress, // Address of the NFT contract in the source chain
            token_amount: tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
            nft_type: nftType, // Sigular or multiple ( 721 / 1155)
            source_chain: sourceChain, // Source chain of NFT
          } = parsedLog;
          await cb(
            await builder.nftLocked(
              tokenId,
              destinationChain,
              destinationUserAddress,
              sourceNftContractAddress,
              tokenAmount.toString(),
              nftType,
              sourceChain,
              log.transactionHash,
              CHAIN_IDENT,
              "",
            ),
          );
        }
        lastBlock = latestBlockNumber;
        await em.upsert(Block, {
          chain: CHAIN_IDENT,
          contractAddress: bridge,
          lastBlock: lastBlock,
        });
        await em.flush();
      }
    } catch (e) {
      logger.error(`${e} while listening for events. Sleeping for 10 seconds`);
      await new Promise<undefined>((resolve) => setTimeout(resolve, 10000));
    }
}
