import type { TezosToolkit } from "@taquito/taquito";

import type { EntityManager } from "@mikro-orm/sqlite";
import type { EventBuilder } from "../..";
import { Block } from "../../../persistence/entities/block";
import type { LockEventIter, LogInstance } from "../../types";
import { TezosGetContractOperations } from "./index";

const CHAIN_IDENT = "TEZOS";

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: LockEventIter,
  lastBlock_: number,
  blockChunks: number,
  provider: TezosToolkit,
  bridge: string,
  restApiUrl: string,
  em: EntityManager,
  logger: LogInstance,
) {
  let lastBlock = Number(lastBlock_);
  while (true) {
    try {
      {
        const latestBlockNumber = (await provider.rpc.getBlockHeader()).level;

        const latestBlock =
          lastBlock + blockChunks < latestBlockNumber
            ? lastBlock + blockChunks
            : latestBlockNumber;

        const logs = await TezosGetContractOperations({
          fromLevel: lastBlock,
          toLevel: latestBlock,
          contractAddress: bridge,
          restApiURL: restApiUrl,
        });
        const startBlock = lastBlock;
        if (!logs.length) {
          logger.trace(
            ` ${startBlock} -> ${latestBlockNumber}: 0 TXs. Awaiting 10s`,
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
          const isLocked = log.tag === "locked";
          if (!isLocked) continue;
          const sourceNftContractAddress = extractStrOrAddr(
            log.payload.source_nft_address,
          );

          const {
            token_id: tokenId, // Unique ID for the NFT transfer
            dest_chain: destinationChain, // Chain to where the NFT is being transferred
            dest_address: destinationUserAddress, // User's address in the destination chain
            token_amount: tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
            nft_type: nftType, // Sigular or multiple ( 721 / 1155)
            source_chain: sourceChain, // Source chain of NFT
          } = log.payload;
          await cb(
            await builder.nftLocked(
              tokenId,
              destinationChain,
              destinationUserAddress,
              sourceNftContractAddress,
              tokenAmount,
              nftType,
              sourceChain,
              log.transactionId.toString(),
              CHAIN_IDENT,
            ),
          );
        }
        lastBlock = latestBlockNumber;
        await em.upsert(Block, {
          chain: CHAIN_IDENT,
          contractAddress: bridge,
          lastBlock: lastBlock,
        });
      }
    } catch (e) {
      logger.error(
        `${e} while listening for tezos events. Sleeping for 10 seconds`,
      );
      await new Promise<undefined>((resolve) => setTimeout(resolve, 10000));
    }
  }
}

const extractStrOrAddr = (addr: { str: string } | { addr: string }): string => {
  if ("str" in addr) return addr.str;
  return addr.addr;
};
