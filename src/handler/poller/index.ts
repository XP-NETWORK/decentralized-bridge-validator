import type { EntityManager } from "@mikro-orm/sqlite";

import { setTimeout } from "node:timers/promises";
import type { AxiosInstance, AxiosResponse } from "axios";
import { LockedEvent } from "../../persistence/entities/locked";
import type {
  LockEvent,
  LockEventIter,
  LogInstance,
  TNftTransferDetailsObject,
  TNftTransferDetailsObjectIter,
} from "../types";

export default async function pollForLockEvents(
  identifier: string,
  cbLe: LockEventIter,
  cb: TNftTransferDetailsObjectIter,
  em: EntityManager,
  serverLinkHandler: AxiosInstance,
  logger: LogInstance,
) {
  type NTOWithID = { id?: number } & TNftTransferDetailsObject;
  async function cbNto(nto: NTOWithID) {
    try {
      await cb(nto, nto.id);
    } catch (e) {
      logger.error("Error processing polled event. Awaiting 10s", e);
      await setTimeout(10000);
    }
  }
  async function _cbLe(le: LockEvent) {
    try {
      await cbLe(le);
    } catch (e) {
      logger.error("Error processing polled event. Awaiting 10s", e);
      await setTimeout(10000);
    }
  }

  while (true) {
    const lastEv = await em
      .createQueryBuilder(LockedEvent)
      .select("*")
      .where({
        listenerChain: identifier,
      })
      .orderBy({
        id: "desc",
      })
      .getSingleResult();

    const failedData = await em
      .createQueryBuilder(LockedEvent)
      .select("*")
      .where({
        listenerChain: identifier,
        status: false,
      })
      .orderBy({
        id: "desc",
      });

    for (let index = 0; index < failedData.length; index++) {
      const tx = failedData[index];
      console.log(tx);
      if (tx.name === "") {
        await _cbLe({
          destinationChain: tx.destinationChain,
          destinationUserAddress: tx.destinationUserAddress,
          listenerChain: tx.listenerChain,
          metaDataUri: tx.metaDataUri,
          nftType: tx.nftType,
          sourceChain: tx.sourceChain,
          sourceNftContractAddress: tx.sourceNftContractAddress,
          tokenAmount: tx.tokenAmount.toString(),
          tokenId: tx.tokenId.toString(),
          transactionHash: tx.transactionHash,
          id: tx.id,
        });
        continue;
      }
      await cbNto(tx.toNTO());
    }

    let lastId = lastEv?.id ?? 0;
    if (lastId) {
      lastId += 1;
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let fetch: AxiosResponse<Response[], any>;
    try {
      const url = `/${identifier}?cursor=${lastId}&limit=10`;
      fetch = await serverLinkHandler.get<Array<Response>>(url);
    } catch (e) {
      const error = e as Error;
      logger.error(`Error fetching data: ${error.message}`);
      logger.info("Awaiting 2s");
      await setTimeout(1 * 1000);
      continue;
    }

    const nTx = fetch.data.length;
    if (nTx === 0) {
      logger.info(`0 Tx, lastId: ${lastId}, wait: 1s`);
      await setTimeout(1 * 1000);
      continue;
    }
    for (const tx of fetch.data) {
      console.log(tx);
      if (tx.name === "") {
        return await _cbLe({
          destinationChain: tx.destination_chain,
          destinationUserAddress: tx.destination_user_address,
          listenerChain: tx.listener_chain,
          metaDataUri: tx.meta_data_uri,
          nftType: tx.nft_type,
          sourceChain: tx.source_chain,
          sourceNftContractAddress: tx.source_nft_contract_address,
          tokenAmount: tx.token_amount.toString(),
          tokenId: tx.token_id.toString(),
          transactionHash: tx.transaction_hash,
          id: tx.id,
        });
      }
      return await cbNto({
        destinationChain: tx.destination_chain,
        destinationUserAddress: tx.destination_user_address,
        fee: tx.fee.toString(),
        lockTxChain: tx.listener_chain,
        metadata: tx.meta_data_uri,
        name: tx.name,
        nftType: tx.nft_type,
        royalty: tx.royalty.toString(),
        royaltyReceiver: tx.royalty_receiver,
        sourceChain: tx.source_chain,
        sourceNftContractAddress: tx.source_nft_contract_address,
        symbol: tx.symbol,
        tokenAmount: tx.token_amount.toString(),
        tokenId: tx.token_id.toString(),
        transactionHash: tx.transaction_hash,
        id: tx.id,
        imgUri: tx.img_uri,
      });
    }
    logger.info(`${fetch.data.length} Tx, lastId: ${lastId}, wait: 1s`);
    await setTimeout(1 * 1000);
  }
}

export type Response = {
  id: number;
  token_amount: number;
  token_id: number;
  destination_user_address: string;
  destination_chain: string;
  source_nft_contract_address: string;
  nft_type: string;
  source_chain: string;
  transaction_hash: string;
  listener_chain: string;
  meta_data_uri: string;
  status: number;
  name: string;
  symbol: string;
  royalty: number;
  royalty_receiver: string;
  fee: number;
  img_uri: string;
};
