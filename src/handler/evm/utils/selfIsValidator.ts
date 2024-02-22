import { Wallet } from "ethers";
import { Bridge } from "../../../contractsTypes/evm";

const selfIsValidator = (bc: Bridge, signer: Wallet) => {
  return async () => {
    const validator = await bc.validators(signer.address);
    return validator[0];
  };
};

export default selfIsValidator;
