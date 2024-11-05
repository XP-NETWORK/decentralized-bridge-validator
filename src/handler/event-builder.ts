import type { StakeEvent } from "./types";

export function eventBuilder() {
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
        id,
      };
    },
  };
}

export type EventBuilder = ReturnType<typeof eventBuilder>;
