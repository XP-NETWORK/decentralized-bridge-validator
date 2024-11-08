import type { Keys } from "casper-js-sdk";
import type { TCasperBridgeClient } from "..";
import type {
  BridgeStorage,
  ERC20Staking,
} from "../../../../contractsTypes/evm";
import type { LogInstance } from "../../../types";

export default async function addSelfAsValidator(
  _storage: BridgeStorage,
  _fetchBridge: () => Promise<readonly [TCasperBridgeClient, () => void]>,
  _identity: Keys.Ed25519,
  _logger: LogInstance,
  _staking: ERC20Staking,
  _validatorAddress: string,
): Promise<boolean> {
  throw new Error("PANIC: Not yet implemented.");
  // const stakedAmt = await staking.stakingBalances(validatorAddress);
  // const pubKeyHex = Buffer.from(identity.publicKey.toUint8Array()).toString(
  //   "hex",
  // );
  // const address = identity.accountAddress.toString();
  // const vad = `${pubKeyHex}|${address}`;
  // if (stakedAmt > 0n) {
  //   const add = await staking.addNewChains([
  //     {
  //       chainType: "casper",
  //       validatorAddress: vad,
  //     },
  //   ]);
  //   const receipt = await add.wait();
  //   logger.info(
  //     `Added self as new chain at hash: ${receipt?.hash}. BN: ${receipt?.blockNumber}`,
  //   );
  // }
  // try {
  //   return "success";
  // } catch (e) {
  //   logger.error("Failed to add self as validator: ", e);
  //   return "failure";
  // }
}
