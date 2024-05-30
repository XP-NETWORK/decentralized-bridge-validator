import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";
import { evm_to_cosm_back } from "./to-cosm-back";
import { emv_to_evm_back } from "./to-evm-back";
import { evm_to_secret_back } from "./to-secret-back";
import { emv_to_tezos_back } from "./to-tezos-back";
import { transferBackMultiple } from "../utils/transfer-back";
import { emv_to_hedera_back } from "./to-hedera-back";
import {evm_to_ton_back} from "./to-ton-back"

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
export * from "./to-hedera-back";
export * from "./to-ton-back";

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test_evm_to_cosm_back = await evm_to_cosm_back();
    const test_evm_to_evm_back = await emv_to_evm_back();
    const test_evm_to_secret_back = await evm_to_secret_back();
    const test_evm_to_tezos_back = await emv_to_tezos_back();
    const test_evm_to_hedera_back = await emv_to_hedera_back();
    const test_evm_to_ton_back = await evm_to_ton_back();

    await transferBackMultiple(
      [
        test_evm_to_cosm_back,
        test_evm_to_evm_back,
        test_evm_to_hedera_back,
        test_evm_to_secret_back,
        test_evm_to_tezos_back,
test_evm_to_ton_back
      ],
      factory
    );
  })();
}
