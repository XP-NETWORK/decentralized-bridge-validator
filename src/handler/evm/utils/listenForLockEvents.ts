import { JsonRpcProvider } from "ethers";
import { log } from ".";
import { EventBuilder } from "../..";
import { TSupportedChains } from "../../../config";
import { Bridge, Bridge__factory } from "../../../contractsTypes/evm";
import { EventIter } from "../../types";

const listenForLockEvents = (
  provider: JsonRpcProvider,
  lastBlock_: bigint,
  blockChunks: number,
  bridge: string,
  bc: Bridge,
  chainIdent: TSupportedChains,
) => {
  return async (builder: EventBuilder, cb: EventIter) => {
    let lastBlock = Number(lastBlock_);
    while (true) {
      const latestBlockNumber = await provider.getBlockNumber();

      const latestBlock =
        lastBlock + blockChunks < latestBlockNumber
          ? lastBlock + blockChunks
          : latestBlockNumber;

      const logs = await provider.getLogs({
        fromBlock: lastBlock,
        toBlock: latestBlock,
        address: bridge,
        topics: [
          Bridge__factory.createInterface().getEvent("Locked").topicHash,
        ],
      });
      const startBlock = lastBlock;
      lastBlock = latestBlockNumber;
      if (!logs.length) {
        log(
          `No Transactions found in chain from block: ${startBlock} to: ${latestBlockNumber}. Waiting for 10 Seconds before looking for new transactions`,
          chainIdent,
        );
        await new Promise<undefined>((e) => setTimeout(e, 10000));
        continue;
      }
      for (const log of logs) {
        const decoded = bc.interface.parseLog(log);
        if (!decoded) continue;
        return cb(
          builder.nftLocked(
            decoded.args.tokenId,
            decoded.args.destinationChain,
            decoded.args.destinationUserAddress,
            decoded.args.sourceNftContractAddress,
            decoded.args.tokenAmount,
            decoded.args.nftType,
            decoded.args.sourceChain,
            log.transactionHash,
          ),
        );
      }
    }
  };
};

export default listenForLockEvents;
