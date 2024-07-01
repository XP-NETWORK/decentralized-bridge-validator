import { EntityManager } from "@mikro-orm/sqlite";

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { EventBuilder } from "../..";
import { Block } from "../../../persistence/entities/block";
import { LockEventIter, LogInstance } from "../../types";

export default async function listenForLockEvents(
  identifier: string,
  builder: EventBuilder,
  cb: LockEventIter,
  lastBlock_: number,
  client: SigningCosmWasmClient,
  blockChunks: number,
  bridge: string,
  em: EntityManager,
  log: LogInstance,
) {
  let lastBlock = lastBlock_;
  while (true)
    try {
      {
        const latestBlockNumber = await client.getHeight();

        const latestBlock =
          lastBlock + blockChunks < latestBlockNumber
            ? lastBlock + blockChunks
            : latestBlockNumber;

        const query = `execute._contract_address = '${bridge}' AND tx.height >= ${lastBlock} AND tx.height <= ${latestBlock}`;
        const logs = await client.searchTx(query);
        const startBlock = lastBlock;
        lastBlock = latestBlockNumber;
        if (!logs.length) {
          log.info(
            `${startBlock} -> ${latestBlockNumber}: 0 TXs. Awaiting 10s`,
          );
          lastBlock = latestBlockNumber;
          await em.upsert(Block, {
            chain: identifier,
            contractAddress: bridge,
            lastBlock: lastBlock,
          });
          await em.flush();
          await new Promise<undefined>((e) => setTimeout(e, 10000));
          continue;
        }
        for (const log of logs) {
          const logToFind = log.events
            .find((item: { type: string }) => item.type === "wasm")
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
              tokenAmount,
              nftType,
              sourceChain,
              log.hash,
              identifier,
            ),
          );
        }
        lastBlock = latestBlockNumber;
        await em.upsert(Block, {
          chain: identifier,
          contractAddress: bridge,
          lastBlock: lastBlock,
        });
        await em.flush();
      }
    } catch (e) {
      log.error(
        identifier,
        `${e} while listening for events. Sleeping for 10 seconds`,
      );
      await new Promise<undefined>((resolve) => setTimeout(resolve, 10000));
    }
}
