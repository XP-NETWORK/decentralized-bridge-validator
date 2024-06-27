import {
  AccountAddressInput,
  Aptos,
  AptosConfig,
  MoveStructId,
  Network,
} from "@aptos-labs/ts-sdk";
import { TBridgeData } from "../../../contractsTypes/aptos";

const selfIsValidator = async (
  aptosClient: Aptos,
  bridgeModule: MoveStructId,
  bridgeAddress: AccountAddressInput,
  publicKey: AccountAddressInput,
): Promise<boolean> => {
  const res: TBridgeData = await aptosClient.account.getAccountResource({
    accountAddress: bridgeAddress,
    resourceType: bridgeModule,
  });
  if (res) {
    const validatorExist = res.validators.data.find(
      (validator) => validator.key === publicKey,
    );
    return !!validatorExist;
  }
  return false;
};

async function test() {
  const DEVNET_CONFIG = new AptosConfig({
    network: Network.DEVNET,
  });
  const DEVNET_CLIENT = new Aptos(DEVNET_CONFIG);

  const isValidator = await selfIsValidator(
    DEVNET_CLIENT,
    "0x4c5fb6a788f0e7b94ad9fc0d7448d9ed166b69bb8e50413a636ce0ff7261f6bb::aptos_nft_bridge::Bridge",
    "0x4c5fb6a788f0e7b94ad9fc0d7448d9ed166b69bb8e50413a636ce0ff7261f6bb",
    "0xd74738213a0d8db59a2611bead568fc976947626b4ca779e17609b347de4c003",
  );

  console.log({ isValidator });
}

test();

export default selfIsValidator;
