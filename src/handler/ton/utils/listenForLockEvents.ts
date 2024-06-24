import { EntityManager } from "@mikro-orm/sqlite";
import { Address, TonClient } from "@ton/ton";
import { raise } from "..";
import { EventBuilder } from "../..";
import { loadLockedEvent } from "../../../contractsTypes/ton/tonBridge";
import { Block } from "../../../persistence/entities/block";
import { LockEventIter } from "../../types";
import log from "./log";

const CHAIN_IDENT = "TON";

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: LockEventIter,
  lastBlock_: number,
  client: TonClient,
  bridge: string,
  em: EntityManager,
) {
  let lastBlock = Number(lastBlock_);
  while (true) {
    try {
      const latestTx = await client.getTransactions(
        Address.parseFriendly(bridge).address,
        { limit: 1 },
      );
      if (Number(latestTx[0].lt) === lastBlock) {
        log(
          `No New Transaction found since ${lastBlock}. Waiting for 10 Seconds before looking for new transactions`,
        );
        await new Promise<undefined>((e) => setTimeout(e, 10000));
        continue;
      }

      const transactions = await client.getTransactions(
        Address.parseFriendly(bridge).address,
        {
          limit: 100,
          lt: latestTx[0].lt.toString(),
          to_lt: String(lastBlock),
          inclusive: true,
        },
      );

      if (!transactions.length) {
        log(
          `No Transactions found in chain from block: ${lastBlock} to: ${latestTx[0].lt.toString()}. Waiting for 10 Seconds before looking for new transactions`,
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
          if (log.body.asSlice().loadUint(32) !== 4205190074) {
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
      log(`${e} while listening for ton events. Sleeping for 10 seconds`);
      await new Promise<undefined>((resolve) => setTimeout(resolve, 10000));
    }
  }
}
