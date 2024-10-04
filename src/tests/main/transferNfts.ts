import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";

import { prodBridgeConfig } from "../../config";
import {
  createTest,
  generateMainnetConfig,
  getMainnetChainConfigs,
  transferMultiple,
} from "../utils";

export const emv_to_evm = async (token_id: string) => {

  const chainConfigs = getMainnetChainConfigs(prodBridgeConfig);
  const configs = await generateMainnetConfig(chainConfigs);

  const firstTest = createTest({
    fromChain: "BSC",
    toChain: "BASE",
    nftType: "singular",
    claimSigner: configs.base.signer,
    receiver: await configs.base.signer.getAddress(),
    signer: configs.bsc.signer,
    deployArgs: {
      name: "TestContract",
      symbol: "TST",
    },
    mintArgs: {
      tokenId: 400n,
      uri: "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
      royalty: 10n,
      royaltyReceiver: configs.bsc.address,
      contract: "",
    },
    approveTokenId: token_id,
  });
  return firstTest;
};

(async () => {
  const factory = ChainFactory(ChainFactoryConfigs.MainNet());
  let test: any = [];

  for (let i = 1; i < 10; i++) {
    let a = await emv_to_evm(i.toString())
    test.push(a);
  }
  await transferMultiple(test, factory);
})();
