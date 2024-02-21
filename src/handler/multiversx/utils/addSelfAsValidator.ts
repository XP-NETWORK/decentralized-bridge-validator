import {
  Account,
  Address,
  ResultsParser,
  SmartContract,
} from "@multiversx/sdk-core";
import { AddressValue, BytesValue } from "@multiversx/sdk-core/out";
import { INetworkProvider } from "@multiversx/sdk-network-providers/out/interface";
import { UserSigner } from "@multiversx/sdk-wallet/out";
import { BridgeStorage } from "../../../contractsTypes/evm";
import {
  ProcessDelayMilliseconds,
  confirmationCountNeeded,
  waitForMSWithMsg,
} from "../../utils";

export async function addSelfAsValidator(
  bc: SmartContract,
  chainID: string,
  storage: BridgeStorage,
  signer: UserSigner,
  provider: INetworkProvider,
): Promise<"success" | "failure"> {
  const vc = async (): Promise<bigint> => {
    const query = bc.createQuery({
      func: "validatorsCount",
    });
    const queryResponse = await provider.queryContract(query);
    const validatorsCountDefinition = bc.getEndpoint("validatorsCount");

    const { firstValue } = new ResultsParser().parseQueryResponse(
      queryResponse,
      validatorsCountDefinition,
    );
    if (!firstValue)
      throw new Error("Failed to read validator count in multiversx");
    const count = firstValue.valueOf();
    return count;
  };

  let validatorCount = Number(await vc());
  let signatureCount = Number(
    await storage.getStakingSignaturesCount(signer.getAddress().bech32()),
  );

  while (signatureCount < confirmationCountNeeded(validatorCount)) {
    await waitForMSWithMsg(
      ProcessDelayMilliseconds,
      `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(
        validatorCount,
      )}`,
    );
    signatureCount = Number(
      await storage.getStakingSignaturesCount(signer.getAddress().bech32()),
    );
    validatorCount = Number(await vc());
  }

  const signatures = [
    ...(await storage.getStakingSignatures(signer.getAddress().bech32())),
  ].map((item) => {
    return {
      signerAddress: item.signerAddress,
      signature: item.signature,
    };
  });

  const userAddress = new Address(signer.getAddress().bech32());
  const userAccount = new Account(userAddress);
  const userOnNetwork = await provider.getAccount(userAddress);
  userAccount.update(userOnNetwork);

  const data = [
    new AddressValue(signer.getAddress()),
    signatures.map((item) => {
      return {
        sig: new BytesValue(
          Buffer.from(item.signature.replace("0x", ""), "hex"),
        ),
        public_key: new AddressValue(new Address(userAddress.bech32())),
      };
    }),
  ];

  const transaction = bc.methods
    .addValidator(data)
    .withSender(signer.getAddress())
    .withChainID(chainID)
    .withNonce(userAccount.nonce)
    .withGasLimit(6_000_000_00)
    .buildTransaction();
  transaction.applySignature(
    await signer.sign(transaction.serializeForSigning()),
  );
  await provider.sendTransaction(transaction);
  return "success";
}
