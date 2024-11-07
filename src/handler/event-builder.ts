import type { EntityManager } from "@mikro-orm/sqlite";
import { LockedEvent } from "../persistence/entities/locked";
import type { StakeEvent } from "./types";

export function eventBuilder(em: EntityManager) {
  return {
    staked(stake: StakeEvent) {
      return stake;
    },
    async nftLocked(
      tokenId: string,
      destinationChain: string,
      destinationUserAddress: string,
      sourceNftContractAddress: string,
      tokenAmount: string,
      nftType: string,
      sourceChain: string,
      transactionHash: string,
      listenerChain: string,
      metaDataUri: string,
      id?: number,
    ) {
      const found = await em.findOne(LockedEvent, {
        transactionHash: transactionHash,
        listenerChain,
      });
      if (!found) {
        const ev = new LockedEvent(
          tokenId,
          destinationChain,
          destinationUserAddress,
          sourceNftContractAddress,
          tokenAmount,
          nftType,
          sourceChain,
          transactionHash,
          listenerChain,
          metaDataUri,
        );
        if (id) ev.id = id;
        await em.persistAndFlush(ev);
      }
      return {
        tokenAmount,
        tokenId,
        destinationChain,
        destinationUserAddress,
        sourceNftContractAddress,
        nftType,
        sourceChain,
        transactionHash,
        metaDataUri,
        listenerChain,
      };
    },
  };
}

export type EventBuilder = ReturnType<typeof eventBuilder>;
