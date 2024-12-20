import type { TSupportedChainTypes } from "../../config";
import type { BridgeStorage } from "../../contractsTypes/evm";
import { eventBuilder } from "../event-builder";
import type { LogInstance, THandler, TStakingHandler } from "../types";
import { retry } from "../utils";

export async function listenStakeEvents(
  chains: Array<THandler>,
  storage: BridgeStorage,
  stakingChain: TStakingHandler,
  fetchNonce: () => Promise<readonly [number, () => void, () => Promise<void>]>,
  log: LogInstance,
) {
  const map = new Map<TSupportedChainTypes, THandler>();
  const deps = { storage };

  const builder = eventBuilder();

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
        const { signature, signer } = await dc.signData(sig.validatorAddress);
        signatures.push({
          validatorAddress: sig.validatorAddress,
          signerAndSignature: {
            signature: signature,
            signerAddress: signer,
          },
        });
      }

      const approvalFn = async () => {
        const [nonce, used, release] = await fetchNonce();
        try {
          const tx = await (
            await deps.storage.approveStake(stakerAddress, signatures, {
              nonce,
            })
          ).wait();
          used();
          // @ts-ignore
          if (!tx?.status) {
            throw new Error("TxFailed");
          }
          return tx;
        } catch (err) {
          await release();
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
      );
      log.info(
        approved
          ? `Approved and Signed Data for Staking Chain at TX: ${approved.hash} for user ${stakerAddress}`
          : `Already approved for ${stakerAddress}`,
      );
    });
  }

  for (const chain of chains) {
    map.set(chain.chainType, chain);
  }
  poolEvents(stakingChain);
}
