import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";
import { evm_to_cosm_back } from "./to-cosm-back";
import { emv_to_evm_back } from "./to-evm-back";
import { evm_to_secret_back } from "./to-secret-back";
import { emv_to_tezos_back } from "./to-tezos-back";
import { transferBackMultiple } from "../utils/transfer-back";

export * from "./to-evm";
export * from "./to-mx";
export * from "./to-secret";
export * from "./to-tezos";
export * from "./to-ton";
export * from "./to-hedera";
export * from "./to-cosm-back";
export * from "./to-evm-back";
export * from "./to-tezos-back";
export * from "./to-hedera";

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test_evm_to_cosm_back = await evm_to_cosm_back();
    const test_evm_to_evm_back = await emv_to_evm_back();
    const test_evm_to_secret_back = await evm_to_secret_back();
    const test_evm_to_tezos_back = await emv_to_tezos_back();

    await transferBackMultiple(
      [
        test_evm_to_cosm_back,
        test_evm_to_evm_back,
        test_evm_to_secret_back,
        test_evm_to_tezos_back,
      ],
      factory
    );
  })();
}
