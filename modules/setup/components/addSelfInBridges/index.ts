import { ethers } from "ethers";
import { IConfigAndWallets } from "../../../validator/types";
import { bridgeContractAbi, bridgeStorageAbi } from "../../../../abi";
import { confirmationCountNeeded } from "../../../validator/utils";
import { waitForMSWithMsg } from "../../../../utils";
import { handleEvmPromt } from "../getInitialFunds/components/promptToGetFunding/handleEvmPrompt";


// @TODO after getting the bridge contract see if this still works

const addSelfInBridges = async ({ config, wallets }: IConfigAndWallets) => {

    for (const chainConfig of config.bridgeChains) {
        if (chainConfig.chainType === "evm") {
            const provider = new ethers.JsonRpcProvider(chainConfig.rpc);
            const wallet = new ethers.Wallet(wallets.evmWallet.privateKey, provider);
            const bridgeContract = new ethers.Contract(chainConfig.contractAddress, bridgeContractAbi, wallet);

            if (await bridgeContract.validators(wallet.address)) {
                console.log(`Already added in ${chainConfig.chain}`)
            } else {

                const validatorCountInChain = Number(await bridgeContract.validatorCount())

                const opProvider = new ethers.JsonRpcProvider(config.optimismChain.rpc);
                const opWallet = new ethers.Wallet(wallets.evmWallet.privateKey, opProvider);
                const bridgeStorageContract = new ethers.Contract(config.optimismChain.contractAddress, bridgeStorageAbi, opWallet);
                
                let signatureCount = Number(await bridgeStorageContract.getStakingSignaturesCount(wallet.address));

                while (confirmationCountNeeded(validatorCountInChain) >= signatureCount) {
                    await waitForMSWithMsg(5000, `Signature count not sufficient; current count: ${signatureCount}`)
                    signatureCount = Number(await bridgeStorageContract.getStakingSignaturesCount(wallet.address));
                }

                const stakingSignatures = await bridgeStorageContract.getStakingSignatures(wallet.address);

                let isNotFullyFunded = true;
                while (isNotFullyFunded) {
                    isNotFullyFunded = await handleEvmPromt({ chainConfig, evmPublicAddress: wallet.address, isNotFullyFunded })
                }

                const addValidatorTx = await bridgeContract.addValidator(wallet.address, stakingSignatures);
                console.log(`Added self as validator in chain: ${chainConfig.chain}, txHash: ${addValidatorTx.hash}`)
            }
        }
    }

}

export default addSelfInBridges;
