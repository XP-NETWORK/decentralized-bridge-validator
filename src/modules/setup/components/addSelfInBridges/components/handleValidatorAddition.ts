import { confirmationCountNeeded, getStorageContract, waitForMSWithMsg } from "@src/utils";
import { isEvmChainFunded, isMultiversXChainFunded } from "@src/modules/setup/components/getInitialFunds/components/promptToGetFunding/components";
import { getEvmBridgeContract, waitForKeyPress } from "@src/utils";
import { processDelayMilliseconds } from "@src/utils/constants/processDelayMilliseconds";
import { IChainConfigAndWallets, IEvmChainConfig } from "@src/types";
import { Bridge } from "@src/contractsTypes";

const handleValidatorAddition = async ({ storageChainConfig, chainConfig, wallets }: IChainConfigAndWallets & { storageChainConfig: IEvmChainConfig; }) => {

    let bridgeContract: Bridge;
    const { evmWallet, multiversXWallet } = wallets;
    const storageContract = getStorageContract({ evmChainConfig: storageChainConfig, evmWallet });
    let failiure = true;


    if (chainConfig.chainType === "evm") {
        bridgeContract = getEvmBridgeContract({ evmChainConfig: chainConfig, evmWallet });
    }


    while (failiure) {
        try {
            const isAlreadyAdded = (await bridgeContract.validators(evmWallet.address)).added;
            console.info({ isAlreadyAdded }, chainConfig.chain)

            if (isAlreadyAdded) {
                console.info(`Already added in ${chainConfig.chain}`)
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
                if (chainConfig.chainType === "evm") {
                    // @TODO handle staking + intial fund case 
                    isFunded = await isEvmChainFunded({ evmChainConfig: chainConfig, evmWallet });
                } else if (chainConfig.chainType === "multiversX") {
                    isFunded = await isMultiversXChainFunded({ multiversXChainConfig: chainConfig, multiversXWallet });
                }

                if (!isFunded)
                    await waitForKeyPress("Press [Enter] key after funding your addresses")
            }

            if (chainConfig.chainType === "evm") {
                const addValidatorTx = await bridgeContract.addValidator(evmWallet.address, stakingSignatures);
                await addValidatorTx.wait();
                console.info(`Added self as validator in chain: ${chainConfig.chain}, txHash: ${addValidatorTx.hash}`);
            }

            failiure = false;
            
        } catch (e) {
            console.info(e)
            await waitForMSWithMsg(processDelayMilliseconds, `Something went wrong in handleValidatorAddition chain ${chainConfig.chain}`)
        }
    }

}

export default handleValidatorAddition