import { AccountAddressInput, Aptos } from "@aptos-labs/ts-sdk";
import { TBridgeData } from "../../../contractsTypes/aptos";
import { BRIDGE_MODULE_NAME } from "../constants";

const selfIsValidator = async (
  aptosClient: Aptos,
  bridge: string,
  publicKey: AccountAddressInput,
): Promise<boolean> => {
  const res: TBridgeData = await aptosClient.account.getAccountResource({
    accountAddress: bridge,
    resourceType: `${bridge}::${BRIDGE_MODULE_NAME}::Bridge`,
  });
  if (res) {
    const validatorExist = res.validators.data.find(
      (validator) => validator.key === publicKey,
    );
    return !!validatorExist;
  }
  return false;
};

export default selfIsValidator;
