import type { ActorSubclass } from "@dfinity/agent";
import type { Ed25519KeyIdentity } from "@dfinity/identity";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import type { _SERVICE } from "../../../contractsTypes/icp/bridge/bridge.types";
import type { LogInstance } from "../../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  useMutexAndRelease,
  waitForMSWithMsg,
} from "../../utils";

export default async function addSelfAsValidator(
  storage: BridgeStorage,
  fetchBridge: () => Promise<readonly [ActorSubclass<_SERVICE>, () => void]>,
  identity: Ed25519KeyIdentity,
  logger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
): Promise<"success" | "failure"> {
  const stakedAmt = await staking.stakingBalances(validatorAddress);
  if (stakedAmt > 0n) {
    const add = await staking.addNewChains([
      {
        chainType: "icp",
        validatorAddress: `${identity.getPrincipal()},${Buffer.from(
          identity.getPublicKey().toRaw(),
        ).toString("hex")}`,
      },
    ]);
    const receipt = await add.wait();
    logger.info(
      `Added self as new chain at hash: ${receipt?.hash}. BN: ${receipt?.blockNumber}`,
    );
  }
  const publicKey = Buffer.from(identity.getPublicKey().toRaw()).toString(
    "hex",
  );
  try {
    // let [bridge, release] = await fetchBridge();
    async function getStakingSignatureCount() {
      return Number(
        useMutexAndRelease(
          fetchBridge,
          async (bridge) => await bridge.get_validator_count(),
        ),
      );
    }
    // release();
    const newV = `${identity.getPrincipal()},${publicKey}`;
    let validatorsCount = await getStakingSignatureCount();
    let signatureCount = Number(await storage.getStakingSignaturesCount(newV));

    while (signatureCount < confirmationCountNeeded(validatorsCount)) {
      await waitForMSWithMsg(
        ProcessDelayMilliseconds,
        `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
          validatorsCount,
        )}`,
      );
      signatureCount = Number(await storage.getStakingSignaturesCount(newV));
      validatorsCount = await getStakingSignatureCount();
    }
    const signatures = [...(await storage.getStakingSignatures(newV))].map(
      (item) => {
        return {
          signerAddress: item.signerAddress,
          signature: item.signature,
        };
      },
    );
    console.log(
      signatures.map((e) => {
        return {
          signature: e.signature,
          signer: e.signerAddress,
        };
      }),
    );
    await useMutexAndRelease(
      fetchBridge,
      async (bridge) =>
        await bridge.add_validator(
          {
            principal: identity.getPrincipal(),
            public_key: publicKey,
          },
          signatures.map((e) => {
            return {
              signature: e.signature.replace("0x", ""),
              signer: e.signerAddress,
            };
          }),
        ),
    );
    return "success";
  } catch (e) {
    logger.error("Failed to add self as validator: ", e);
    return "failure";
  }
}
