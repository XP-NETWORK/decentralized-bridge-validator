import { TSupportedChains } from "../config";
import {
  THandler,
  TNftTransferDetailsObject,
  eventBuilder,
} from "../handler/types";

export async function emitEvents(chains: Array<THandler>) {
  const map = new Map<TSupportedChains, THandler>();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const deps: { storage: any } = { storage: "" as any };

  const builder = eventBuilder();

  function listenEvents(chain: THandler) {
    chain.listenForLockEvents(builder, async (ev) => {
      const sourceChain = map.get(ev.sourceChain as TSupportedChains);
      if (!sourceChain)
        throw new Error(`Unsupported chain for ${ev.transactionHash}`);

      const nftDetails = await sourceChain.nftData(
        ev.tokenId,
        ev.sourceNftContractAddress,
      );
      const fee = await deps.storage.getFee(ev.destinationChain);
      const royaltyReceiver = await deps.storage.getRoyaltyReceiver(
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

      const approved = deps.storage.approveLockNft(
        inft.transactionHash,
        sourceChain.chainIdent,
        signature.signature,
        signature.signer,
      );
      console.log(
        `Approved and Signed Data for ${inft.transactionHash} on ${sourceChain.chainIdent} at TX: ${approved.txhash}`,
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
