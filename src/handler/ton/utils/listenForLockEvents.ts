import { Address, TonClient } from "@ton/ton";
import { raise } from "..";
import { EventBuilder } from "../..";
import { loadLockedEvent } from "../../../contractsTypes/ton/tonBridge";
import { EventIter } from "../../types";
import TonLog from "./log";

export default async function listenForLockEvents(
  builder: EventBuilder,
  cb: EventIter,
  lastBlock_: bigint,
  client: TonClient,
  bridge: string,
) {
  let lastBlock = Number(lastBlock_);
  while (true) {
    try {
      const latestTx = await client.getTransactions(
        Address.parseFriendly(bridge).address,
        { limit: 1 },
      );

      const transactions = await client.getTransactions(
        Address.parseFriendly(bridge).address,
        {
          limit: 100,
          hash: latestTx[0].hash().toString("base64"),
          lt: latestTx[0].lt.toString(),
          to_lt: String(lastBlock),
          inclusive: true,
        },
      );

      const startBlock = lastBlock;
      lastBlock = Number(transactions[0].lt);
      if (!transactions.length) {
        TonLog(
          `No Transactions found in chain from block: ${startBlock} to: ${lastBlock}`,
        );
        TonLog("Waiting for 10 Seconds before looking for new transactions");
        await new Promise<undefined>((e) => setTimeout(e, 10000));
        continue;
      }
      for (const tx of transactions) {
        for (let i = 0; i < tx.outMessages.size; i++) {
          const log = tx.outMessages.get(i) ?? raise("Unreachable");
          // if its not the lock nft event we early return
          if (log.body.asSlice().loadUint(32) !== 3571773646) {
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

          return cb(
            builder.nftLocked(
              tokenId.toString(),
              destinationChain,
              destinationUserAddress,
              getSourceNftContractAddress(),
              tokenAmount.toString(),
              nftType,
              sourceChain,
              Buffer.from(tx.hash()).toString("hex"),
            ),
          );
        }
      }
    } catch (e) {
      TonLog(`TON: ${e} while listening for ton events`);
      TonLog("Sleeping for 10 seconds");
      await new Promise<undefined>((resolve) => setTimeout(resolve, 10000));
    }
  }
}
