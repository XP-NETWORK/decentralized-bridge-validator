import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";
import { icp_to_cosm_back } from "./to-cosm-back";
import { icp_to_evm_back } from "./to-evm-back";
import { icp_to_secret_back } from "./to-secret-back";
import { icp_to_tezos_back } from "./to-tezos-back";
import { transferBackMultiple } from "../utils/transfer-back";
import { icp_to_hedera_back } from "./to-hedera-back";
import { icp_to_ton_back } from "./to-ton-back";

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
    const test_icp_to_cosm_back = await icp_to_cosm_back();
    const test_icp_to_evm_back = await icp_to_evm_back();
    const test_icp_to_secret_back = await icp_to_secret_back();
    const test_icp_to_tezos_back = await icp_to_tezos_back();
    const test_icp_to_hedera_back = await icp_to_hedera_back();
    const test_icp_to_ton_back = await icp_to_ton_back();

    await transferBackMultiple(
      [
        test_icp_to_cosm_back,
        test_icp_to_evm_back,
        test_icp_to_hedera_back,
        test_icp_to_secret_back,
        test_icp_to_tezos_back,
        test_icp_to_ton_back,
      ],
      factory
    );
  })();
}
