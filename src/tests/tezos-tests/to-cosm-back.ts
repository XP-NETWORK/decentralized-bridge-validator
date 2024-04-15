import { readFile } from "fs/promises";
import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";

import { bridgeTestChains } from "../../config";
import { IGeneratedWallets } from "../../types";
import { generateWallets } from "../../utils";
import { generateConfig, getChainConfigs, getSigners } from "../utils";
import {
  createTransferBackTest,
  transferBackMultiple,
} from "../utils/transfer-back";

export const tezos_to_cosm_back = async () => {
  const file = await readFile("secrets.json", "utf-8").catch(() => "");
  let genWallets: IGeneratedWallets;
  if (!file) {
    console.log("No file found");
    genWallets = await generateWallets();
  } else {
    genWallets = JSON.parse(file);
  }

  const chainConfigs = getChainConfigs(bridgeTestChains);
  const configs = await generateConfig(genWallets, chainConfigs);
  const signers = await getSigners(genWallets)

  const firstTest = createTransferBackTest({
    fromChain: "TEZOS",
    toChain: "TERRA",
    nftType: "singular",
    claimSigner: await signers.terra,
    receiver: (await (await signers.terra).getAccounts())[0].address,
    signer: configs.tezos.signer,
    deployArgs: {
      name: "TestContract",
      description: "Bruh",
    },
    mintArgs: {
      tokenId: 400,
      uri: "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
      contract: "",
    },
    approveTokenId: "400",
    signerAddress: configs.bsc.signer.address,
  });
  return firstTest;
};

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test = await tezos_to_cosm_back();
    await transferBackMultiple([test], factory);
  })();
}
