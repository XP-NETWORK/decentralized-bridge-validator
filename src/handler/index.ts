import { setTimeout } from "node:timers/promises";
import type { EntityManager } from "@mikro-orm/sqlite";
import type { AxiosInstance } from "axios";
import type { TSupportedChainTypes, TSupportedChains } from "../config";
import type { BridgeStorage } from "../contractsTypes/evm";
import { LockedEvent } from "../persistence/entities/locked";
import type {
  LockEvent,
  LogInstance,
  StakeEvent,
  THandler,
  TNftTransferDetailsObject,
  TStakingHandler,
} from "./types";
import { retry } from "./utils";

export async function listenEvents(
  chains: Array<THandler>,
  storage: BridgeStorage,
  em: EntityManager,
  serverLinkHandler: AxiosInstance | undefined,
  log: LogInstance,
) {
  const map = new Map<TSupportedChains, THandler>();
  const deps = { storage };

  const builder = eventBuilder(em);

  const processEventsFailSafe = async (chain: THandler, ev: LockEvent) => {
    let success = false;
    while (!success) {
      try {
        await processEvent(chain, ev);
        success = true;
      } catch (e) {
        log.error(e, "Error processing poll events");
        log.info("Awaiting 2s");
        await setTimeout(2 * 1000);
      }
    }
  };
  async function pollEvents(chain: THandler) {
    log.info(`Polling for events on: ${chain.chainIdent}`);
    chain.pollForLockEvents(builder, async (ev) => {
      processEventsFailSafe(chain, ev);
    });
  }

  async function processEvent(chain: THandler, ev: LockEvent) {
    const sourceChain = map.get(ev.sourceChain as TSupportedChains);
    if (!sourceChain) {
      log.warn(
        `Unsupported src chain: ${sourceChain} for ${ev.transactionHash}`,
      );
      return;
    }
    const destinationChain = map.get(ev.destinationChain as TSupportedChains);
    if (!destinationChain) {
      log.warn(
        `Unsupported dest chain: ${destinationChain} for ${ev.transactionHash} ${destinationChain} ${ev.destinationChain}`,
      );
      return;
    }

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
      lockTxChain: chain.chainIdent,
    };
    log.trace(inft);

    const signature = await destinationChain.signClaimData(inft);

    const alreadyProcessed = await deps.storage
      .usedSignatures(signature.signature)
      .catch(() => false);

    if (alreadyProcessed) {
      log.warn(
        `Signature already processed for ${inft.transactionHash} on ${sourceChain.chainIdent}`,
      );
      return;
    }

    const approvalFn = async () => {
      try {
        const tx = await Promise.race([
          (
            await deps.storage.approveLockNft(
              inft.transactionHash,
              chain.chainIdent,
              signature.signature,
              signature.signer,
            )
          ).wait(),
          setTimeout(10 * 1000),
        ]);
        //@ts-ignore
        if (!tx?.status) throw new Error("Approve failed");
        return tx;
      } catch (err) {
        const err_ = err as unknown as { shortMessage: string };
        if (err_.shortMessage?.includes("Signature already used")) {
          return null;
        }
        log.error(err_, "Error while approving lock");
        throw err;
      }
    };

    const approved = await retry(
      approvalFn,
      `Approving transfer ${JSON.stringify(inft, null, 2)}`,
      log,
      3,
    );

    log.info(
      //@ts-ignore
      `Approved and Signed Data for ${inft.transactionHash} on ${sourceChain.chainIdent} at TX: ${approved?.hash}`,
    );
  }

  async function poolEvents(chain: THandler) {
    log.info(`Listening for events on ${chain.chainIdent}`);
    chain.listenForLockEvents(builder, async (ev) => {
      processEventsFailSafe(chain, ev);
    });
  }

  for (const chain of chains) {
    if (map.get(chain.chainIdent) !== undefined) {
      throw Error("Duplicate chain nonce!");
    }
    map.set(chain.chainIdent, chain);
    serverLinkHandler === undefined ? poolEvents(chain) : pollEvents(chain);
  }
}

export async function listenStakeEvents(
  chains: Array<THandler>,
  storage: BridgeStorage,
  stakingChain: TStakingHandler,
  em: EntityManager,
  log: LogInstance,
) {
  const map = new Map<TSupportedChainTypes, THandler>();
  const deps = { storage };

  const builder = eventBuilder(em);

  async function poolEvents(chain: TStakingHandler) {
    log.info("Listening for Staking Events");

    chain.listenForStakingEvents(builder, async (ev) => {
      const stakerAddress = ev[0].caller;

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

      const approvalFn = async () => {
        try {
          const tx = await Promise.race([
            (await deps.storage.approveStake(stakerAddress, signatures)).wait(),
            setTimeout(10 * 1000),
          ]);

          // @ts-ignore
          if (!tx?.status) {
            throw new Error("TxFailed");
          }
          return tx;
        } catch (err) {
          const err_ = err as unknown as { shortMessage: string };
          if (err_.shortMessage?.includes("Already voted for this validator")) {
            return null;
          }
          log.error(err_, "Error while approving stake");
          throw err;
        }
      };
      const approved = await retry(
        approvalFn,
        `Approving stake ${JSON.stringify(ev, null, 2)}`,
        log,
        6,
      );
      log.info(
        approved
          ? `Approved and Signed Data for Staking Chain at TX: ${approved.hash} for user ${stakerAddress}`
          : `Already approved for ${stakerAddress}`,
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
        );
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
      };
    },
  };
}

export type EventBuilder = ReturnType<typeof eventBuilder>;
