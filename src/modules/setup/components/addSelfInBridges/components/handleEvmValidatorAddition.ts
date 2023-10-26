import { confirmationCountNeeded, getStorageContract, waitForMSWithMsg } from "@src/utils";
import { isEvmChainFunded } from "@src/modules/setup/components/getInitialFunds/components/promptToGetFunding/components";
import { getEvmBridgeContract, waitForKeyPress } from "@src/utils";
import { processDelayMilliseconds } from "@src/utils/constants/processDelayMilliseconds";
import { IEvmChainConfig, IEvmChainConfigAndEvmWallet } from "@src/types";

const handleEvmValidatorAddition = async ({ storageChainConfig, evmChainConfig, evmWallet }: IEvmChainConfigAndEvmWallet & { storageChainConfig: IEvmChainConfig; }) => {

    const bridgeContract = getEvmBridgeContract({ evmChainConfig, evmWallet });
    const storageContract = getStorageContract({ evmChainConfig: storageChainConfig, evmWallet });

    let failiure = true

    while (failiure) {
        try {
            const isAlreadyAdded = await bridgeContract.validators(evmWallet.address);
            console.info({ isAlreadyAdded }, evmChainConfig.chain)

            if (isAlreadyAdded) {
                console.info(`Already added in ${evmChainConfig.chain}`)
                return;
            }

            let validatorCountInChain = Number(await bridgeContract.validatorsCount());
            let signatureCount = Number(await storageContract.getStakingSignaturesCount(evmWallet.address));


            while (signatureCount < confirmationCountNeeded(validatorCountInChain)) {
                await waitForMSWithMsg(processDelayMilliseconds, `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(validatorCountInChain)}`)
                signatureCount = Number(await storageContract.getStakingSignaturesCount(evmWallet.address));
                validatorCountInChain = Number(await bridgeContract.validatorsCount());
            }

            const stakingSignatures: string[] = [...(await storageContract.getStakingSignatures(evmWallet.address))].map(item => item.signature);

            let isFunded = false;

            while (!isFunded) {
                // @TODO handle staking + intial fund case 
                isFunded = await isEvmChainFunded({ evmChainConfig, evmWallet });
                if (!isFunded)
                    await waitForKeyPress("Press [Enter] key after funding your addresses")
            }

            const addValidatorTx = await bridgeContract.addValidator(evmWallet.address, stakingSignatures);
            await addValidatorTx.wait();
            console.info(`Added self as validator in chain: ${evmChainConfig.chain}, txHash: ${addValidatorTx.hash}`);
            failiure = false
        } catch (e) {
            console.info(e)
            await waitForMSWithMsg(processDelayMilliseconds, `Something went wrong in handleEvmValidatorAddition chain ${evmChainConfig.chain}`)
        }
    }

}

export default handleEvmValidatorAddition