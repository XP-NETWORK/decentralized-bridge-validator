import type { EntityManager } from "@mikro-orm/sqlite";
import type { JsonRpcProvider } from "ethers";
import type { TSupportedChainTypes, TSupportedChains } from "../../../config";
import { ERC20Staking__factory } from "../../../contractsTypes/evm";
import { Block } from "../../../persistence/entities/block";
import type { EventBuilder } from "../../event-builder";
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
        if (!logs.length) {
          logger.info(
            `[${startBlock} -> ${latestBlock}]: 0 TXs. Awaiting 10s.`,
          );
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
        logger.info(`[${startBlock} -> ${latestBlock}]: ${logs.length} TXs.`);
        for (const log of logs) {
          logger.info(`Processing TX at: ${log.transactionHash}`);
          const decoded = stakerInt.parseLog(log);
          const receipt = await log.getTransactionReceipt();
          if (!decoded) continue;
          await cb(
            builder.staked(
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              decoded.args.validatorAddressAndChainType.map((e: any) => {
                return {
                  caller: receipt.from,
                  chainType: e.chainType as TSupportedChainTypes,
                  validatorAddress: e.validatorAddress,
                };
              }),
            ),
          );
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
          "Error while listening for events. Sleeping for 10 seconds",
          e,
        );
        await new Promise((e) => setTimeout(e, 10000));
      }
    }
  };
};

export default listenForStakingEvents;
