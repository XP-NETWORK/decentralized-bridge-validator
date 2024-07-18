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

export const cosm_to_tezos_back = async () => {
  const file = await readFile("secrets.json", "utf-8").catch(() => "");
  let genWallets: IGeneratedWallets;
  if (!file) {
    console.log("No file found");
    genWallets = await generateWallets();
  } else {
    genWallets = JSON.parse(file);
  }

  const signers = getSigners(genWallets);
  const chainConfigs = getChainConfigs(bridgeTestChains);
  const configs = await generateConfig(genWallets, chainConfigs);

  const firstTest = createTransferBackTest({
    fromChain: "TERRA",
    toChain: "TEZOS",
    nftType: "singular",
    claimSigner: configs.tezos.signer,
    receiver: await configs.tezos.signer.publicKeyHash(),
    signer: await signers.terra,
    deployArgs: {
      name: "TestContract",
      symbol: "TST",
    },
    mintArgs: {
      token_id: "400",
      token_uri:
        "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
      contract: "",
    },
    approveTokenId: "400",
    signerAddress: (await (await signers.terra).getAccounts())[0].address,
  });
  return firstTest;
};

if (require.main === module) {
  (async () => {
    const factory = ChainFactory(ChainFactoryConfigs.TestNet());
    const test = await cosm_to_tezos_back();
    await transferBackMultiple([test], factory);
  })();
}

// OK TESTED✅