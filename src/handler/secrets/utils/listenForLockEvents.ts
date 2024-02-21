import chalk from "chalk";
import { SecretNetworkClient } from "secretjs";
import { EventBuilder } from "../..";
import { EventIter } from "../../types";

export async function listenForLockEvents(
  builder: EventBuilder,
  cb: EventIter,
  lastBlock_: bigint,
  client: SecretNetworkClient,
  blockChunks: number,
  bridge: string,
) {
  let lastBlock = Number(lastBlock_);
  while (true) {
    const latestBlockNumberResponse =
      await client.query.tendermint.getLatestBlock({});
    const latestBlockNumber = Number(
      latestBlockNumberResponse.block?.header?.height,
    );

    const latestBlock =
      lastBlock + blockChunks < latestBlockNumber
        ? lastBlock + blockChunks
        : latestBlockNumber;

    const query = `message.contract_address = '${bridge}' AND tx.height >= ${lastBlock} AND tx.height <= ${latestBlock}`;

    const logs = await client.query.txsQuery(query);
    const startBlock = lastBlock;
    lastBlock = latestBlockNumber;
    if (!logs.length) {
      SecretLog(
        `No Transactions found in chain from block: ${startBlock} to: ${latestBlockNumber}. "Waiting for 10 Seconds before looking for new transactions"`,
      );
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
      return cb(
        builder.nftLocked(
          tokenId,
          destinationChain,
          destinationUserAddress,
          sourceNftContractAddress,
          tokenAmount,
          nftType,
          sourceChain,
          log.transactionHash,
        ),
      );
    }
  }
}

function SecretLog(msg: string) {
  console.log(chalk.red("SECRET:\t\t"), msg);
}
