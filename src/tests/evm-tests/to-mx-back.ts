import { readFile } from "fs/promises";
import { ChainFactory, ChainFactoryConfigs } from "xp-decentralized-sdk";
import { bridgeTestChains } from "../../config";
import { IGeneratedWallets } from "../../types";
import { generateWallets } from "../../utils";
import {
    generateConfig,
    getChainConfigs,
    getSigners,
} from "../utils";
import { createTransferBackTest, transferBackMultiple } from "../utils/transfer-back";

export const evm_to_mx_back = async () => {
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
        fromChain: "MATIC",
        toChain: "MULTIVERSX",
        nftType: "singular",
        claimSigner: configs.multiversx.signer,
        receiver: await configs.multiversx.signer.getAddress(),
        signer: configs.matic.signer,
        signerAddress: configs.matic.signer.address,
        deployArgs: {
            name: "TestContract",
            symbol: "TST",
        },
        mintArgs: {
            tokenId: 400n,
            uri: "https://gateway.pinata.cloud/ipfs/QmQd3v1ZQrW1Q1g7KxGjzV5Vw5Uz1c4v2z3FQX2w1d5b1z",
            royalty: 10n,
            royaltyReceiver: signers.eth.address,
            contract: "",
        },
        approveTokenId: "400",
    });
    return firstTest;
};

if (require.main === module) {
    (async () => {
        const factory = ChainFactory(ChainFactoryConfigs.TestNet());
        const test = await evm_to_mx_back();
        await transferBackMultiple([test], factory);
    })();
}

// TESTED: ✅OK 
