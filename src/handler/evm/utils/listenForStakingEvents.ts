import { EntityManager } from "@mikro-orm/sqlite";
import { JsonRpcProvider } from "ethers";
import { EventBuilder } from "../..";
import { TSupportedChains } from "../../../config";
import { ERC20Staking__factory } from "../../../contractsTypes/evm";
import { Block } from "../../../persistence/entities/block";
import { LogInstance, StakeEventIter } from "../../types";

const listenForStakingEvents = (
  provider: JsonRpcProvider,
  lastBlock_: number,
  staker: string,
  blockChunks: number,
  chainIdent: TSupportedChains,
  em: EntityManager,
  logger: LogInstance,
) => {
  return async (builder: EventBuilder, cb: StakeEventIter) => {
    let lastBlock = lastBlock_;
    const stakerInt = ERC20Staking__factory.createInterface();
    while (true) {
      try {
        const latestBlockNumber = await provider.getBlockNumber();

        const latestBlock =
          lastBlock + blockChunks < latestBlockNumber
            ? lastBlock + blockChunks
            : latestBlockNumber;

        const logs = await provider.getLogs({
          fromBlock: lastBlock,
          toBlock: latestBlock,
          address: staker,
          topics: [
            ERC20Staking__factory.createInterface().getEvent("Staked")
              .topicHash,
          ],
        });
        const startBlock = lastBlock;

        if (!logs.length) {
          logger.trace(
            `No Transactions found in chain from block: ${startBlock} to: ${latestBlockNumber}. Waiting for 10 Seconds before looking for new transactions`,
            chainIdent,
          );
          lastBlock = latestBlockNumber;
          await em.upsert(Block, {
            chain: chainIdent,
            contractAddress: staker,
            lastBlock: lastBlock,
          });
          await em.flush();
          await new Promise<undefined>((e) => setTimeout(e, 10000));
          continue;
        }
        for (const log of logs) {
          const decoded = stakerInt.parseLog(log);
          if (!decoded) continue;
          await cb(builder.staked(decoded.args.validatorAddressAndChainType));
        }
        lastBlock = latestBlockNumber;
        await em.upsert(Block, {
          chain: chainIdent,
          contractAddress: staker,
          lastBlock: lastBlock,
        });
        await em.flush();
      } catch (e) {
        logger.error(
          `${e} while listening for events. Sleeping for 10 seconds`,
          chainIdent,
        );
        await new Promise((e) => setTimeout(e, 10000));
      }
    }
  };
};

export default listenForStakingEvents;
