import type { Wallet } from "ethers";
import type { Bridge } from "../../../contractsTypes/evm";
import type { MutexReleaser } from "../types";

const selfIsValidator = (
  bc: () => Promise<[Bridge, MutexReleaser]>,
  signer: Wallet,
) => {
  return async () => {
    const [bridge, release] = await bc();
    const validator = await bridge.validators(signer.address);
    release();
    return validator[0];
  };
};

export default selfIsValidator;
