import type { Wallet } from "ethers";
import type { Bridge } from "../../../contractsTypes/evm";
import { useMutexAndRelease } from "../../utils";
import type { MutexReleaser } from "../types";

const selfIsValidator = (
  bc: () => Promise<[Bridge, MutexReleaser]>,
  signer: Wallet,
) => {
  return async () => {
    return useMutexAndRelease(bc, async (bridge) => {
      const v = await bridge.validators(signer.address);
      return v.added;
    });
  };
};

export default selfIsValidator;
