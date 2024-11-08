import { hash } from "@stablelib/blake2b";
import type { Signer } from "@taquito/taquito";
import { b58cdecode, b58cencode, prefix } from "@taquito/utils";
import type {
  BridgeStorage,
  ERC20Staking,
} from "../../../../contractsTypes/evm";
import type { BridgeContractType } from "../../../../contractsTypes/tezos/Bridge.types";
import { tas } from "../../../../contractsTypes/tezos/type-aliases";
import type { LogInstance } from "../../../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  useMutexAndRelease,
  waitForMSWithMsg,
} from "../../../utils";

export default async function addSelfAsValidator(
  storage: BridgeStorage,
  bc: () => Promise<readonly [BridgeContractType, () => void]>,
  signer: Signer,
  logger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
): Promise<boolean> {
  try {
    const stakedAmt = await staking.stakingBalances(validatorAddress);
    if (stakedAmt > 0n) {
      const add = await staking.addNewChains([
        {
          chainType: "tezos",
          validatorAddress: await signer.publicKey(),
        },
      ]);
      const receipt = await add.wait();
      logger.info(
        `Added self as new chain at hash: ${receipt?.hash}. BN: ${receipt?.blockNumber}`,
      );
    }

    let validatorsCount = await useMutexAndRelease(bc, async (bridge) =>
      (await bridge.storage()).validators_count.toNumber(),
    );
    let signatureCount = Number(
      await storage.getStakingSignaturesCount(await signer.publicKey()),
    );

    while (signatureCount < confirmationCountNeeded(validatorsCount)) {
      await waitForMSWithMsg(
        ProcessDelayMilliseconds,
        `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
          validatorsCount,
        )}`,
      );
      signatureCount = Number(
        await storage.getStakingSignaturesCount(await signer.publicKeyHash()),
      );
      validatorsCount = await useMutexAndRelease(bc, async (bridge) =>
        (await bridge.storage()).validators_count.toNumber(),
      );
    }

    const stakingSignatures = [
      ...(await storage.getStakingSignatures(await signer.publicKey())),
    ].map((item) => {
      return {
        signerAddress: item.signerAddress,
        signature: item.signature,
      };
    });
    await useMutexAndRelease(bc, async (bridge) => {
      await bridge.methodsObject
        .add_validator({
          sigs: stakingSignatures.map((e) => {
            const addr = tas.address(
              b58cencode(
                hash(
                  new Uint8Array(b58cdecode(e.signerAddress, prefix.edpk)),
                  20,
                ),
                prefix.tz1,
              ),
            );
            const sig = tas.signature(
              Buffer.from(e.signature.replace("0x", ""), "hex").toString(),
            );
            return {
              addr,
              sig,
              signer: tas.key(e.signerAddress),
            };
          }),
          validator: tas.address(await signer.publicKeyHash()),
        })
        .send();
    });

    return true;
  } catch (e) {
    logger.error("Failed to add self as validator: ", e);
    return false;
  }
}
