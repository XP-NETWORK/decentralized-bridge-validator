import { setTimeout } from "node:timers/promises";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { EventBuilder } from "../../../event-builder";
import type { LockEventIter, LogInstance } from "../../../types";

import type { Parser } from "@make-software/ces-js-parser";
import type { CasperClient } from "casper-js-sdk";
import { Block } from "../../../../persistence/entities/block";
import { useMutexAndRelease } from "../../../utils";
import type { Any } from "./any";

const CHAIN_IDENT = "CASPER";
const WAIT_TIME = 1000;
const blockChunks = 1000;

export default async function listenForLockEvents(
  _builder: EventBuilder,
  cb: LockEventIter,
  lastBlock_: number,
  fetchCasper: () => Promise<readonly [CasperClient, () => void]>,
  fetchParser: () => Promise<readonly [Parser, () => void]>,
  bridge: string,
  em: EntityManager,
  logger: LogInstance,
) {
  let lastBlock = lastBlock_;
  while (true) {
    try {
      const latestBlockNumber = await useMutexAndRelease(
        fetchCasper,
        async (cc) =>
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          (await cc.nodeClient.getLatestBlockInfo()).block?.header.height!,
      );
      const latestBlock =
        lastBlock + blockChunks < latestBlockNumber
          ? lastBlock + blockChunks
          : latestBlockNumber;
      if (lastBlock >= latestBlock) {
        await setTimeout(WAIT_TIME); // Sleep for 2 seconds
        continue;
      }
      for (let i = lastBlock; i <= latestBlock; i++) {
        logger.info("Processing block:", i);
        const block = await useMutexAndRelease(
          fetchCasper,
          async (cc) => await cc.nodeClient.getBlockInfoByHeight(i),
        );
        //@ts-ignore
        if (block.block?.body.deploy_hashes.length <= 0) continue;
        //@ts-ignore
        // biome-ignore lint/correctness/noUnsafeOptionalChaining: <explanation>
        for (const hash of block.block?.body.deploy_hashes) {
          logger.info(hash);
          const deploy = await useMutexAndRelease(
            fetchCasper,
            async (cc) => await cc.nodeClient.getDeployInfo(hash),
          );
          const args = deploy.deploy.session.ModuleBytes
            ?.args as unknown as Any[];
          if (!args) continue;
          if (args[0].length < 2) continue;
          const bridge_cntract = args[0][0] || undefined;
          const address = args[0][1] || { bytes: undefined };
          if (
            deploy.execution_results.length > 0 &&
            deploy.execution_results[0].result.Success &&
            bridge_cntract === "bridge_contract" &&
            address.parsed === bridge
          ) {
            const event = await useMutexAndRelease(
              fetchParser,
              async (parser) => {
                return parser.parseExecutionResult(
                  deploy.execution_results[0].result,
                );
              },
            );
            const lev = event.find((e) => e.event.name === "Locked");
            if (!lev) continue;
            const data = lev.event.data;
            cb({
              destinationChain: data.destination_chain.data,
              destinationUserAddress: data.destination_user_address.data,
              listenerChain: CHAIN_IDENT,
              metaDataUri: data.metadata_uri.data,
              nftType: data.nft_type.data,
              sourceChain: data.source_chain.data,
              sourceNftContractAddress: data.source_nft_contract_address.data,
              tokenAmount: data.token_amount.data.toString(),
              tokenId: data.token_id.data.toString(),
              transactionHash: deploy.deploy.hash,
            });
          }
        }
        lastBlock = latestBlock;
        await em.upsert(Block, {
          chain: CHAIN_IDENT,
          contractAddress: bridge,
          lastBlock: lastBlock,
        });
        await em.flush();
      }
    } catch (e) {
      logger.error(
        "Error while listening for lock events. Sleeping for 10 seconds",
        e,
      );
      await setTimeout(WAIT_TIME);
    }
  }
}
