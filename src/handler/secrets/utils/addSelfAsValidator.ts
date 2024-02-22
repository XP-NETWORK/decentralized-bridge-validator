import { SecretNetworkClient, Wallet, pubkeyToAddress } from "secretjs";
import { encodeSecp256k1Pubkey } from "secretjs/dist/wallet_amino";
import { BridgeStorage } from "../../../contractsTypes/evm";
import { AddValidatorType } from "../../../contractsTypes/secret/secretBridge";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../../utils";

export default async function addSelfAsValidator(
  publicKey: string,
  storage: BridgeStorage,
  client: SecretNetworkClient,
  bridge: string,
  bridgeCodeHash: string,
  wallet: Wallet,
): Promise<"success" | "failure"> {
  async function getStakingSignatureCount() {
    const res = (await client.query.compute.queryContract({
      contract_address: bridge,
      code_hash: bridgeCodeHash,
      query: {
        get_validators_count: {},
      },
    })) as { validator_count_response: { count: number } };
    return res.validator_count_response.count;
  }
  const newV = Buffer.from(publicKey).toString("base64");
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

  const validatorToAddPublicKeyUint8 = Buffer.from(wallet.address, "hex");
  const msg: AddValidatorType = {
    add_validator: {
      data: {
        validator: [
          encodeSecp256k1Pubkey(validatorToAddPublicKeyUint8).value,
          pubkeyToAddress(validatorToAddPublicKeyUint8),
        ],
        signatures: signatures.map((item) => {
          return {
            signature: Buffer.from(
              item.signature.replace("0x", ""),
              "hex",
            ).toString("base64"),
            signer_address: item.signerAddress,
          };
        }),
      },
    },
  };

  await client.tx.compute.executeContract(
    {
      contract_address: bridge,
      msg,
      code_hash: bridgeCodeHash,
      sender: pubkeyToAddress(Buffer.from(wallet.publicKey)),
    },
    {
      gasLimit: 200_000,
    },
  );

  return "success";
}
