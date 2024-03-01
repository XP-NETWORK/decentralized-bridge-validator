import { TezosToolkit } from "@taquito/taquito";

import { EntityManager } from "@mikro-orm/sqlite";
import { EventBuilder } from "../..";
import { Block } from "../../../persistence/entities/block";
import { EventIter } from "../../types";
import { TezosGetContractOperations, log } from "./index";

const CHAIN_IDENT = "TEZOS";

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: EventIter,
  lastBlock_: number,
  blockChunks: number,
  provider: TezosToolkit,
  bridge: string,
  restApiUrl: string,
  em: EntityManager,
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
          log(
            `No Transactions found in chain TEZOS from block: ${startBlock} to: ${latestBlockNumber}. Waiting for 10 Seconds before looking for new transactions`,
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
            log.source_nft_address,
          );

          const {
            token_id: tokenId, // Unique ID for the NFT transfer
            dest_chain: destinationChain, // Chain to where the NFT is being transferred
            dest_address: destinationUserAddress, // User's address in the destination chain
            token_amount: tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
            nft_type: nftType, // Sigular or multiple ( 721 / 1155)
            source_chain: sourceChain, // Source chain of NFT
            transaction_hash: transactionHash,
          } = log;
          await cb(
            builder.nftLocked(
              tokenId,
              destinationChain,
              destinationUserAddress,
              sourceNftContractAddress,
              tokenAmount,
              nftType,
              sourceChain,
              transactionHash,
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
      log(`${e} while listening for ton events. Sleeping for 10 seconds`);
      await new Promise<undefined>((resolve) => setTimeout(resolve, 10000));
    }
  }
}

const extractStrOrAddr = (addr: { str: string } | { addr: string }): string => {
  if ("str" in addr) return addr.str;
  return addr.addr;
};
