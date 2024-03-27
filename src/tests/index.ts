import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";
import {
  emv_to_evm,
  evm_to_mx,
  evm_to_secret,
  evm_to_tezos,
  evm_to_ton,
} from "./evm-tests";
import { mx_to_evm, mx_to_secret, mx_to_tezos, mx_to_ton } from "./mx-tests";
import {
  secret_to_evm,
  secret_to_mx,
  secret_to_tezos,
  secret_to_ton,
} from "./secret-tests";
import {
  tezos_to_evm,
  tezos_to_mx,
  tezos_to_secret,
  tezos_to_ton,
} from "./tezos-tests";
import { transferMultiple } from "./utils";

(async () => {
  const evmtests = await Promise.all([
    emv_to_evm(),
    evm_to_mx(),
    evm_to_secret(),
    evm_to_tezos(),
    evm_to_ton(),
  ]);

  const mxtests = await Promise.all([
    mx_to_evm(),
    mx_to_secret(),
    mx_to_tezos(),
    mx_to_ton(),
  ]);

  const secrettest = await Promise.all([
    secret_to_evm(),
    secret_to_mx(),
    secret_to_tezos(),
    secret_to_ton(),
  ]);

  const tezostests = await Promise.all([
    tezos_to_evm(),
    tezos_to_mx(),
    tezos_to_secret(),
    tezos_to_ton(),
  ]);

  const factory = ChainFactory(ChainFactoryConfigs.TestNet());
  await transferMultiple(
    [...evmtests, ...mxtests, ...secrettest, ...tezostests],
    factory,
  );
})();
