import { Wallet } from "ethers";
import { Bridge } from "../../../contractsTypes/evm";

const getSelfIsValidator = (bc: Bridge, signer: Wallet) => {
  return async () => {
    const validator = await bc.validators(signer.address);
    return validator[0];
  };
};

export default getSelfIsValidator;
