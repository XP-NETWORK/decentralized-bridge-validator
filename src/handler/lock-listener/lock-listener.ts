import { setTimeout } from "node:timers/promises";
import { type EntityManager, wrap } from "@mikro-orm/sqlite";
import { Mutex } from "async-mutex";
import type { AxiosInstance } from "axios";
import axios from "axios";
import type { JsonRpcProvider } from "ethers";
import type { TSupportedChains } from "../../config";
import type { BridgeStorage } from "../../contractsTypes/evm";
import { LockedEvent } from "../../persistence/entities/locked";
import { eventBuilder } from "../event-builder";
import type {
  LockEvent,
  LogInstance,
  THandler,
  TNftTransferDetailsObject,
} from "../types";
import {
  convertNumbToHexToString,
  fetchHttpOrIpfs,
  retry,
  useMutexAndRelease,
} from "../utils";
import { unreachable } from "../utils/unreachable";
import { processEventsFailSafe } from "./process-fail-safe";

export async function listenEvents(
  chains: Array<THandler>,
  storage: BridgeStorage,
  storageProvider: JsonRpcProvider,
  fetchNonce: () => Promise<readonly [number, () => void, () => Promise<void>]>,
  em: EntityManager,
  serverLinkHandler: AxiosInstance | undefined,
  log: LogInstance,
) {
  const map = new Map<TSupportedChains, THandler>();
  const deps = { storage };
  const storex = new Mutex();
  const fetchStorage = async () => {
    const releaser = await storex.acquire();
    return [storage, releaser] as const;
  };

  const builder = eventBuilder();

  async function pollEvents(chain: THandler) {
    log.info(`Polling for events on: ${chain.chainIdent}`);
    chain.pollForLockEvents(
      builder,
      async (ev, evId) => {
        await signAndSubmitSignature(ev, evId);
      },
      async (le) => await processEvent(chain, le),
    );
  }

  async function processEvent(chain: THandler, ev: LockEvent) {
    const sourceChain = map.get(ev.sourceChain as TSupportedChains);
    if (!sourceChain) {
      log.warn(
        `Unsupported src chain: ${ev.sourceChain} for ${ev.transactionHash} on ${ev.listenerChain}`,
      );
      return;
    }
    const destinationChain = map.get(ev.destinationChain as TSupportedChains);
    if (!destinationChain) {
      log.warn(
        `Unsupported dest chain: ${ev.destinationChain} for ${ev.transactionHash} on ${ev.listenerChain}`,
      );
      return;
    }

    const nftDetails = await sourceChain.nftData(
      ev.sourceChain === "SECRET"
        ? convertNumbToHexToString(ev.tokenId)
        : ev.tokenId,
      ev.sourceNftContractAddress,
      log,
    );

    const vr = destinationChain.validateNftData(nftDetails);
    if (!vr.valid) {
      log.warn(
        `Invalid NFT data for ${ev.transactionHash} on ${sourceChain.chainIdent}. Reason: ${vr.reason}`,
      );
      return;
    }

    const fee = await deps.storage.chainFee(ev.destinationChain);
    const royaltyReceiver = await deps.storage.chainRoyalty(
      ev.destinationChain,
    );

    let imgUri = "";
    let metadataUri = "";
    // const metadataUri =
    //   ev.sourceChain === "CASPER"
    //     ? ev.metaDataUri
    //     : nftDetails.metadata || ev.metaDataUri;

    if (ev.sourceChain === "CASPER" || ev.sourceChain === "SECRET") {
      metadataUri = ev.metaDataUri;
    } else {
      metadataUri = nftDetails.metadata || ev.metaDataUri;
    }

    if (ev.destinationChain === "CASPER") {
      metadataUri = JSON.stringify({
        token_uri: metadataUri,
      });
    }

    log.trace({
      "1": "METADATA URI",
      "2": nftDetails.metadata,
      "3": ev.metaDataUri,
      "4": metadataUri,
      "5": nftDetails.metadata || ev.metaDataUri,
    });

    try {
      const data = await fetchHttpOrIpfs(metadataUri, axios.create());
      imgUri = data?.image || data?.displayUri || data?.asset;
    } catch (ex) {
      log.trace("CATCH fetchHttpOrIpfs");
      imgUri = metadataUri;
    }

    const inft: TNftTransferDetailsObject = {
      destinationChain: ev.destinationChain,
      destinationUserAddress: ev.destinationUserAddress,
      fee: fee.toString(),
      metadata: metadataUri,
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
      imgUri: imgUri?.substring(imgUri?.indexOf("https://")) || "",
    };

    await signAndSubmitSignature(inft, ev.id);
  }

  async function signAndSubmitSignature(
    inft: TNftTransferDetailsObject,
    evId?: number,
  ) {
    const sourceChain = map.get(inft.sourceChain as TSupportedChains);
    if (!sourceChain) unreachable();
    const destinationChain = map.get(inft.destinationChain as TSupportedChains);
    if (!destinationChain) unreachable();
    const evs = await em.findOne(LockedEvent, {
      transactionHash: inft.transactionHash,
      listenerChain: inft.lockTxChain,
    });
    if (!evs) {
      const nev = new LockedEvent(inft);
      if (evId) nev.id = evId;
      await em.persistAndFlush(nev);
    }

    log.trace(inft);

    const signature = await destinationChain.signClaimData(inft);

    log.trace("Signatures: ", signature);

    const alreadyProcessed = await deps.storage
      .usedSignatures(signature.signature)
      .catch((e) => {
        log.trace("USED SIGN ERROR", e);
        throw e;
      });

    log.trace("Tx Already Processed?", alreadyProcessed);

    if (alreadyProcessed) {
      log.warn(
        `Signature already processed for ${inft.transactionHash} on ${sourceChain.chainIdent}`,
      );
      const found = await em.findOne(LockedEvent, {
        transactionHash: inft.transactionHash,
        listenerChain: inft.lockTxChain,
      });
      if (found) {
        wrap(found).assign({
          status: true,
        });
        await em.flush();
      }
      return;
    }
    const approvalFn = async () => {
      log.trace("Approving Lock");

      const approveLockTx = async () => {
        log.trace("Getting Nonce");
        const [nonce, used, release] = await fetchNonce();
        log.trace("Nonce", nonce);
        try {
          return await useMutexAndRelease(fetchStorage, async (storage) => {
            const feeData = await storageProvider.getFeeData();
            log.info(
              `Using nonce: ${nonce}, txHash: ${
                inft.transactionHash
              } ${new Date().getSeconds()} ${+new Date()}`,
            );
            const response = await (
              await storage.approveLockNft(
                inft.transactionHash,
                inft.lockTxChain,
                signature.signature,
                signature.signer,
                {
                  nonce,
                  maxFeePerGas: feeData.maxFeePerGas,
                  maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
                },
              )
            ).wait();
            used();
            log.info(
              `Used nonce: ${nonce}, txHash: ${
                inft.transactionHash
              } ${new Date().getSeconds()} ${+new Date()}`,
            );
            await setTimeout(5 * 1000);
            return response;
          });
        } catch (err) {
          release();
          throw err;
        }
      };

      try {
        const tx = await approveLockTx();
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
    );

    log.info(
      `Approved: ${inft.transactionHash} on ${sourceChain.chainIdent} at TX: ${approved?.hash}`,
    );
    const found = await em.findOne(LockedEvent, {
      transactionHash: inft.transactionHash,
      listenerChain: inft.lockTxChain,
    });
    if (found) {
      wrap(found).assign({
        status: true,
      });
      await em.flush();
    }
  }

  async function poolEvents(chain: THandler) {
    log.info(`Listening for events on ${chain.chainIdent}`);
    chain.listenForLockEvents(builder, async (ev) => {
      processEventsFailSafe(chain, ev, log, processEvent);
    });
  }

  for (const chain of chains) {
    if (map.get(chain.chainIdent) !== undefined) {
      throw Error("Duplicate chain ident!");
    }
    map.set(chain.chainIdent, chain);
    serverLinkHandler === undefined ? poolEvents(chain) : pollEvents(chain);
  }
}
