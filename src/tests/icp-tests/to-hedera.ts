import { readFile } from "fs/promises";
import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";

import { bridgeTestChains } from "../../config";
import { IGeneratedWallets } from "../../types";
import { syncWallets } from "../../utils";
import { createTest, generateConfig, getChainConfigs, getSigners, transferMultiple } from "../utils";
import { Logger } from "tslog";

export const icp_to_hedera = async () => {
  const logger = new Logger({
    name: "Test"
  })
  const file = await readFile("secrets.json", "utf-8").catch(() => "");
  let genWallets: IGeneratedWallets;
  if (!file) {
    console.log("No file found");
    genWallets = await syncWallets(logger);
  } else {
    genWallets = JSON.parse(file);
  }

  const signers = getSigners(genWallets);
  const chainConfigs = getChainConfigs(bridgeTestChains);
  const configs = await generateConfig(genWallets, chainConfigs);

  const firstTest = createTest({
    fromChain: "ICP",
    toChain: "HEDERA",
    nftType: "singular",
    claimSigner: configs.hedera.signer,
    receiver: configs.hedera.signer.address,
    signer: configs.icp.signer as any,
    deployArgs: {
      name: "TestContract",
      symbol: "TST",
    },
    mintArgs: {
      metadata: "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
      owner: signers.icp.getPrincipal().toText(),
      contract: "",
      token_id: 400n,
    },
    approveTokenId: "400",
    signerAddress: (await configs.icp.signer.getPrincipal()).toText(),
  });
  return firstTest;
};

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test = await icp_to_hedera();
    await transferMultiple([test], factory);
  })();
}
