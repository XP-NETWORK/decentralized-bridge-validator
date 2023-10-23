import { confirmationCountNeeded, getStorageContract, waitForMSWithMsg } from "../../../../../utils";
import { handleEvmPromt } from "../../getInitialFunds/components/promptToGetFunding/handleEvmPrompt";
import { getEvmBridgeContract, waitForKeyPress } from "../../../../../utils/functions";
import { IHandleEvmValidatorAddition } from "./types";
import { processDelayMilliseconds } from "../../../../../utils/constants/processDelayMilliseconds";

const handleEvmValidatorAddition = async ({ storageChainConfig, evmChainConfig, evmWallet }: IHandleEvmValidatorAddition) => {



    const storageContract = getStorageContract({ evmChainConfig: storageChainConfig, evmWallet });

    let signatureCount = Number(await storageContract.getStakingSignaturesCount(evmWallet.address));
    let failiure = true
    const bridgeContract = getEvmBridgeContract({ evmChainConfig, evmWallet });

    while (failiure) {
        try {
            const isAlreadyAdded = await bridgeContract.validators(evmWallet.address);
            console.log({ isAlreadyAdded }, evmChainConfig.chain)
            if (isAlreadyAdded) {
                console.log(`Already added in ${evmChainConfig.chain}`)
            } else {

                let validatorCountInChain = Number(await bridgeContract.validatorsCount());
                while (signatureCount < confirmationCountNeeded(validatorCountInChain)) {
                    await waitForMSWithMsg(processDelayMilliseconds, `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(validatorCountInChain)}`)
                    signatureCount = Number(await storageContract.getStakingSignaturesCount(evmWallet.address));
                    validatorCountInChain = Number(await bridgeContract.validatorsCount());
                }

                const stakingSignatures = [...(await storageContract.getStakingSignatures(evmWallet.address))];

                let isNotFullyFunded = true;

                while (isNotFullyFunded) {
                    // @TODO handle staking + intial fund case 
                    isNotFullyFunded = await handleEvmPromt({ evmChainConfig, evmWallet });
                    if (isNotFullyFunded)
                        await waitForKeyPress("Press [Enter] key after funding your addresses")
                }

                const addValidatorTx = await bridgeContract.addValidator(evmWallet.address, stakingSignatures);
                console.log(`Added self as validator in chain: ${evmChainConfig.chain}, txHash: ${addValidatorTx.hash}`);
            }
            failiure = false
        } catch (e) {
            console.log(e)
            await waitForMSWithMsg(processDelayMilliseconds, `Something went wrong in handleEvmValidatorAddition chain ${evmChainConfig.chain}`)
        }
    }

}

export default handleEvmValidatorAddition