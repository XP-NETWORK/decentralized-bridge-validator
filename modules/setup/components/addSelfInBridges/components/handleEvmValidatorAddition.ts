import { confirmationCountNeeded, getStorageContract, waitForMSWithMsg } from "../../../../../utils";
import { handleEvmPromt } from "../../getInitialFunds/components/promptToGetFunding/handleEvmPrompt";
import { getEvmBridgeContract } from "../../../../../utils/functions";
import { IHandleEvmValidatorAddition } from "./types";

const handleEvmValidatorAddition = async ({ storageChainConfig, evmChainConfig, evmWallet }: IHandleEvmValidatorAddition) => {

    const bridgeContract = getEvmBridgeContract({ evmChainConfig, evmWallet });
    const storageContract = getStorageContract({ storageChainConfig, evmWallet });

    let signatureCount = (await storageContract.getStakingSignaturesCount(evmWallet.address)).toNumber();
    let failiure = true
    while (failiure) {
        try {
            if (await bridgeContract.validators(evmWallet.address)) {
                console.log(`Already added in ${evmChainConfig.chain}`)
            } else {

                let validatorCountInChain = (await bridgeContract.validatorsCount()).toNumber();
                while (signatureCount < confirmationCountNeeded(validatorCountInChain)) {
                    await waitForMSWithMsg(5000, `Signature count not sufficient; current count: ${signatureCount}, needed count: ${validatorCountInChain}`)
                    signatureCount = (await storageContract.getStakingSignaturesCount(evmWallet.address)).toNumber();
                    validatorCountInChain = (await bridgeContract.validatorsCount()).toNumber();
                }

                const stakingSignatures = await storageContract.getStakingSignatures(evmWallet.address);

                let isNotFullyFunded = true;

                while (isNotFullyFunded) {
                    isNotFullyFunded = await handleEvmPromt({ evmChainConfig, evmPublicAddress: evmWallet.address });
                };


                const addValidatorTx = await bridgeContract.addValidator(evmWallet.address, stakingSignatures);
                console.log(`Added self as validator in chain: ${evmChainConfig.chain}, txHash: ${addValidatorTx.hash}`);
                failiure = false
            }
        } catch (e) {
            waitForMSWithMsg(5000, `Something went wrong in handleEvmValidatorAddition chain ${evmChainConfig.chain}`)
        }
    }

}

export default handleEvmValidatorAddition