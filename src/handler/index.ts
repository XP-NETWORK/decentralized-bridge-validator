import { TSupportedChainTypes, TSupportedChains } from "../config";
import { BridgeStorage } from "../contractsTypes/evm";
import {
  StakeEvent,
  THandler,
  TNftTransferDetailsObject,
  TStakingHandler,
} from "./types";
import { ValidatorLog, retry } from "./utils";

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
        throw new Error(`Unsupported src chain for ${ev.transactionHash}`);
      const destinationChain = map.get(ev.destinationChain as TSupportedChains);
      if (!destinationChain)
        throw new Error(`Unsupported dest chain for ${ev.transactionHash}`);

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
      console.log(inft);

      const signature = await destinationChain.signClaimData(inft);

      const alreadyProcessed = await deps.storage
        .usedSignatures(signature.signature)
        .catch(() => false);

      if (alreadyProcessed) {
        ValidatorLog(
          `Signature already processed for ${inft.transactionHash} on ${sourceChain.chainIdent}`,
        );
        return;
      }

      const approvalFn = async () =>
        await deps.storage.approveLockNft(
          inft.transactionHash,
          chain.chainIdent,
          signature.signature,
          signature.signer,
          {
            gasPrice: 1000000,
          },
        );
      const approved = await retry(
        approvalFn,
        `Approving transfer ${JSON.stringify(inft, null, 2)}`,
        6,
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

export async function listenStakeEvents(
  chains: Array<THandler>,
  storage: BridgeStorage,
  stakingChain: TStakingHandler,
) {
  const map = new Map<TSupportedChainTypes, THandler>();
  const deps = { storage };

  const builder = eventBuilder();

  async function poolEvents(chain: TStakingHandler) {
    ValidatorLog("Listening for Staking Events");
    chain.listenForStakingEvents(builder, async (ev) => {
      const signatures: {
        validatorAddress: string;
        signerAndSignature: {
          signerAddress: string;
          signature: string;
        };
      }[] = [];
      for (const sig of ev) {
        const dc = map.get(sig.chainType);
        if (!dc) {
          throw new Error(`Unknown destination chain type: ${sig.chainType}`);
        }
        const signerAndSignature = await dc.signData(sig.validatorAddress);
        signatures.push({
          validatorAddress: sig.validatorAddress,
          signerAndSignature: {
            signature: signerAndSignature.signature,
            signerAddress: signerAndSignature.signer,
          },
        });
      }
      const newEvmValidator = ev.find((item) => item.chainType === "evm");
      if (!newEvmValidator) {
        throw new Error("Unreachable State");
      }

      const approvalFn = async () =>
        await deps.storage.approveStake(
          newEvmValidator.validatorAddress,
          signatures,
        );
      const approved = await retry(
        approvalFn,
        `Approving stake ${JSON.stringify(ev, null, 2)}`,
        6,
      );
      ValidatorLog(
        `Approved and Signed Data for Staking Chain at TX: ${approved.hash}`,
      );
    });
  }

  for (const chain of chains) {
    if (chain.chainType === "evm") {
      if (chain.chainIdent === "BSC") {
        map.set(chain.chainType, chain);
        continue;
      }
      continue;
    }
    map.set(chain.chainType, chain);
  }
  poolEvents(stakingChain);
}

export function eventBuilder() {
  return {
    staked(stake: StakeEvent) {
      return stake;
    },
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
