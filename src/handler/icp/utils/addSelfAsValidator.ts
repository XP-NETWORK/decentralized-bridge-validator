import type { ActorSubclass } from "@dfinity/agent";
import type { Ed25519KeyIdentity } from "@dfinity/identity";
import type { BridgeStorage, ERC20Staking } from "../../../contractsTypes/evm";
import type { _SERVICE } from "../../../contractsTypes/icp/bridge/bridge.types";
import type { LogInstance } from "../../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../../utils";

export default async function addSelfAsValidator(
  storage: BridgeStorage,
  bridge: ActorSubclass<_SERVICE>,
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
    async function getStakingSignatureCount() {
      return Number(await bridge.get_validator_count());
    }
    const newV = publicKey;
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

    await bridge.add_validator(
      {
        principal: identity.getPrincipal(),
        public_key: newV,
      },
      signatures.map((e) => {
        return {
          signature: e.signature,
          signer: e.signerAddress,
        };
      }),
    );
    return "success";
  } catch (e) {
    logger.error("Failed to add self as validator: ", e);
    return "failure";
  }
}
