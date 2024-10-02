import { readFile } from "fs/promises";
import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";

import { bridgeTestChains } from "../../config";
import { IGeneratedWallets } from "../../types";
import { syncWallets } from "../../utils";
import { generateConfig, getChainConfigs, getSigners } from "../utils";
import {
  createTransferBackTest,
  transferBackMultiple,
} from "../utils/transfer-back";
import { Logger } from "tslog";

export const icp_to_mx_back = async () => {
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

  const firstTest = createTransferBackTest({
    fromChain: "ICP",
    toChain: "MULTIVERSX",
    nftType: "singular",
    claimSigner: signers.multiversx,
    receiver: await signers.multiversx.getAddress(),
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
    const test = await icp_to_mx_back();
    await transferBackMultiple([test], factory);
  })();
}
