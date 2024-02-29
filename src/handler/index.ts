import { TSupportedChains } from "../config";
import { BridgeStorage } from "../contractsTypes/evm";
import { THandler, TNftTransferDetailsObject } from "./types";
import { ValidatorLog } from "./utils";

export async function listenEvents(
  chains: Array<THandler>,
  storage: BridgeStorage,
) {
  const map = new Map<TSupportedChains, THandler>();
  const deps = { storage };

  const builder = eventBuilder();

  async function poolEvents(chain: THandler) {
    ValidatorLog(`Listening for events on ${chain.chainIdent}`);
    chain.listenForLockEvents(builder, async (ev) => {
      const sourceChain = map.get(ev.sourceChain as TSupportedChains);
      if (!sourceChain)
        throw new Error(`Unsupported chain for ${ev.transactionHash}`);

      const nftDetails = await sourceChain.nftData(
        ev.tokenId,
        ev.sourceNftContractAddress,
      );
      const fee = await deps.storage.chainFee(ev.destinationChain);
      const royaltyReceiver = await deps.storage.chainRoyalty(
        ev.destinationChain,
      );

      const inft: TNftTransferDetailsObject = {
        destinationChain: ev.destinationChain,
        destinationUserAddress: ev.destinationUserAddress,
        fee: fee.toString(),
        metadata: nftDetails.metadata,
        name: nftDetails.name,
        nftType: ev.nftType,
        royalty: nftDetails.royalty.toString(),
        royaltyReceiver,
        sourceChain: ev.sourceChain,
        sourceNftContractAddress: ev.sourceNftContractAddress,
        symbol: nftDetails.symbol,
        tokenAmount: ev.tokenAmount,
        tokenId: ev.tokenId,
        transactionHash: ev.transactionHash,
      };

      const signature = await sourceChain.signClaimData(inft);

      const alreadyProcessed = await deps.storage
        .usedSignatures(signature.signature)
        .catch(() => false);

      if (alreadyProcessed) {
        ValidatorLog(
          `Signature already processed for ${inft.transactionHash} on ${sourceChain.chainIdent}`,
        );
        return;
      }

      const approved = await deps.storage.approveLockNft(
        inft.transactionHash,
        sourceChain.chainIdent,
        signature.signature,
        signature.signer,
        {
          gasPrice: 1000000,
        },
      );
      ValidatorLog(
        `Approved and Signed Data for ${inft.transactionHash} on ${sourceChain.chainIdent} at TX: ${approved.hash}`,
      );
    });
  }

  for (const chain of chains) {
    if (map.get(chain.chainIdent) !== undefined) {
      throw Error("Duplicate chain nonce!");
    }
    map.set(chain.chainIdent, chain);
    poolEvents(chain);
  }
}

export function eventBuilder() {
  return {
    nftLocked(
      tokenId: string,
      destinationChain: string,
      destinationUserAddress: string,
      sourceNftContractAddress: string,
      tokenAmount: string,
      nftType: string,
      sourceChain: string,
      transactionHash: string,
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
      };
    },
  };
}

export type EventBuilder = ReturnType<typeof eventBuilder>;
