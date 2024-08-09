import type { EntityManager } from "@mikro-orm/sqlite";
import type { JsonRpcProvider } from "ethers";
import type { EventBuilder } from "../..";
import type { TSupportedChains } from "../../../config";
import { ERC20Staking__factory } from "../../../contractsTypes/evm";
import { Block } from "../../../persistence/entities/block";
import type { LogInstance, StakeEventIter } from "../../types";

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

        logger.trace(
          `${startBlock} -> ${latestBlock}: ${logs.length} TXs. Awaiting 10s`,
        );

        if (!logs.length) {
          lastBlock = latestBlock + 1;
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
          logger.info(`found event at ${lastBlock} - ${latestBlock}`);
          await cb(builder.staked(decoded.args.validatorAddressAndChainType));
        }
        lastBlock = latestBlock;
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
