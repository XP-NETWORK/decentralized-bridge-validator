import { type Wallet, pubkeyToAddress } from "secretjs";
import {
  encodeSecp256k1Pubkey,
  encodeSecp256k1Signature,
} from "secretjs/dist/wallet_amino";
import type {
  BridgeStorage,
  ERC20Staking,
} from "../../../../contractsTypes/evm";
import type { AddValidatorType } from "../../../../contractsTypes/secret/secretBridge";
import type { LogInstance } from "../../../types";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  useMutexAndRelease,
  waitForMSWithMsg,
} from "../../../utils";
import { addNewChain } from "../../common/add-new-chain";
import type { SecretProviderFetch } from "../types";

export default async function addSelfAsValidator(
  publicKey: string,
  storage: BridgeStorage,
  fetchProvider: SecretProviderFetch,
  bridge: string,
  bridgeCodeHash: string,
  wallet: Wallet,
  logger: LogInstance,
  staking: ERC20Staking,
  validatorAddress: string,
): Promise<"success" | "failure"> {
  try {
    await addNewChain(staking, "scrt", validatorAddress, publicKey, logger);
    async function getStakingSignatureCount() {
      const res = await useMutexAndRelease(
        fetchProvider,
        async (client) =>
          (await client.query.compute.queryContract({
            contract_address: bridge,
            code_hash: bridgeCodeHash,
            query: {
              get_validators_count: {},
            },
          })) as { validator_count_response: { count: number } },
      );
      return res.validator_count_response.count;
    }
    let validatorsCount = await getStakingSignatureCount();
    let signatureCount = Number(
      await storage.getStakingSignaturesCount(publicKey),
    );

    while (signatureCount < confirmationCountNeeded(validatorsCount)) {
      await waitForMSWithMsg(
        ProcessDelayMilliseconds,
        `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
          validatorsCount,
        )}`,
      );
      signatureCount = Number(
        await storage.getStakingSignaturesCount(publicKey),
      );
      validatorsCount = await getStakingSignatureCount();
    }
    const signatures = [...(await storage.getStakingSignatures(publicKey))].map(
      (item) => {
        return {
          signerAddress: item.signerAddress,
          signature: item.signature,
        };
      },
    );

    const validatorToAddPublicKeyUint8 = Buffer.from(publicKey, "hex");
    const msg: AddValidatorType = {
      add_validator: {
        data: {
          validator: [
            encodeSecp256k1Pubkey(validatorToAddPublicKeyUint8).value,
            pubkeyToAddress(validatorToAddPublicKeyUint8),
          ],
          signatures: signatures.map((item) => {
            return {
              signature: encodeSecp256k1Signature(
                Buffer.from(item.signerAddress, "hex"),
                Buffer.from(item.signature.replace("0x", ""), "hex"),
              ).signature,
              signer_address: encodeSecp256k1Pubkey(
                Buffer.from(item.signerAddress, "hex"),
              ).value,
            };
          }),
        },
      },
    };
    const add = await useMutexAndRelease(
      fetchProvider,
      async (client) =>
        await client.tx.compute.executeContract(
          {
            contract_address: bridge,
            msg,
            code_hash: bridgeCodeHash,
            sender: pubkeyToAddress(Buffer.from(wallet.publicKey)),
          },
          {
            gasLimit: 300_000,
          },
        ),
    );
    logger.info(
      `Submitted tx to add self as validator at hash: ${
        add.transactionHash
      }. Status: ${
        add.rawLog.includes("AddNewValidatorEventInfo") ? "success" : "failure"
      }. TX:`,
      add,
    );
    return add.rawLog.includes("AddNewValidatorEventInfo")
      ? "success"
      : "failure";
  } catch (e) {
    logger.error("Failed to add self as validator: ", e);
    return "failure";
  }
}
