import { TSupportedChains } from "../config";
import { BridgeStorage } from "../contractsTypes/evm";
import {
  THandler,
  TNftTransferDetailsObject,
  eventBuilder,
} from "../handler/types";

export async function emitEvents(
  chains: Array<THandler>,
  storage: BridgeStorage,
) {
  const map = new Map<TSupportedChains, THandler>();
  const deps = { storage };

  const builder = eventBuilder();

  async function listenEvents(chain: THandler) {
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

      const approved = await deps.storage.approveLockNft(
        inft.transactionHash,
        sourceChain.chainIdent,
        signature.signature,
        signature.signer,
        {
          gasPrice: 1000000,
        },
      );
      console.log(
        `Approved and Signed Data for ${inft.transactionHash} on ${sourceChain.chainIdent} at TX: ${approved.hash}`,
      );
    });
  }

  for (const chain of chains) {
    if (map.get(chain.chainIdent) !== undefined) {
      throw Error("Duplicate chain nonce!");
    }
    map.set(chain.chainIdent, chain);
    listenEvents(chain);
  }
}

export function configureDeps() {
  return {};
}
