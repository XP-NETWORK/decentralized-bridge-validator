import { TezosToolkit } from "@taquito/taquito";

import { EventBuilder } from "../..";
import { EventIter } from "../../types";
import { TezosGetContractOperations } from "../operations";
import { TezosLog } from "./nftData";

export async function listenForLockEvents(
  builder: EventBuilder,
  cb: EventIter,
  lastBlock_: bigint,
  blockChunks: number,
  provider: TezosToolkit,
  bridge: string,
  restApiUrl: string,
) {
  let lastBlock = Number(lastBlock_);
  while (true) {
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
    lastBlock = latestBlockNumber;
    if (!logs.length) {
      TezosLog(
        `No Transactions found in chain TEZOS from block: ${startBlock} to: ${latestBlockNumber}. Waiting for 10 Seconds before looking for new transactions`,
      );
      await new Promise<undefined>((e) => setTimeout(e, 10000));
      continue;
    }
    for (const log of logs) {
      const isLocked = log.tag === "locked";
      if (!isLocked) continue;
      const sourceNftContractAddress = extractStrOrAddr(log.source_nft_address);

      const {
        token_id: tokenId, // Unique ID for the NFT transfer
        dest_chain: destinationChain, // Chain to where the NFT is being transferred
        dest_address: destinationUserAddress, // User's address in the destination chain
        token_amount: tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
        nft_type: nftType, // Sigular or multiple ( 721 / 1155)
        source_chain: sourceChain, // Source chain of NFT
        transaction_hash: transactionHash,
      } = log;
      return cb(
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
  }
}

const extractStrOrAddr = (addr: { str: string } | { addr: string }): string => {
  if ("str" in addr) return addr.str;
  return addr.addr;
};
