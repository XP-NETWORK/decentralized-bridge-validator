import { confirmationCountNeeded, getMultiversXBridgeContract, getStorageContract, waitForMSWithMsg } from "@src/utils";
import { isEvmChainFunded, isMultiversXChainFunded } from "@src/modules/setup/components/getInitialFunds/components/promptToGetFunding/components";
import { getEvmBridgeContract, waitForKeyPress } from "@src/utils";
import { processDelayMilliseconds } from "@src/utils/constants/processDelayMilliseconds";
import { IBridge, IChainConfigAndWallets, IEvmChainConfig } from "@src/types";



const handleValidatorAddition = async ({ storageChainConfig, chainConfig, wallets }: IChainConfigAndWallets & { storageChainConfig: IEvmChainConfig; }) => {

    const storageContract = getStorageContract({ evmChainConfig: storageChainConfig, evmWallet: wallets.evmWallet });

    let failiure = true;

    let bridgeContract: IBridge;
    let publicWalletAddress: string;
    let isChainFunded: () => Promise<boolean>;


    if (chainConfig.chainType === "evm") {
        bridgeContract = getEvmBridgeContract({ evmChainConfig: chainConfig, evmWallet: wallets.evmWallet });
        publicWalletAddress = wallets.evmWallet.address;
        isChainFunded = () => isEvmChainFunded({ evmChainConfig: chainConfig, evmWallet: wallets.evmWallet });

    } else if (chainConfig.chainType === "multiversX") {
        bridgeContract = getMultiversXBridgeContract({ multiversXChainConfig: chainConfig, multiversXWallet: wallets.multiversXWallet });
        publicWalletAddress = wallets.multiversXWallet.userWallet.address;
        isChainFunded = () => isMultiversXChainFunded({ multiversXChainConfig: chainConfig, multiversXWallet: wallets.multiversXWallet });
    }


    while (failiure) {
        try {
            const isAlreadyAdded = (await bridgeContract.validators(publicWalletAddress)).added;
            console.info({ isAlreadyAdded }, chainConfig.chain)

            if (isAlreadyAdded) {
                console.info(`Already added in ${chainConfig.chain}`)
                return;
            }

            let validatorCountInChain = Number(await bridgeContract.validatorsCount());
            let signatureCount = Number(await storageContract.getStakingSignaturesCount(publicWalletAddress));


            while (signatureCount < confirmationCountNeeded(validatorCountInChain)) {
                await waitForMSWithMsg(processDelayMilliseconds, `Signature count not sufficient; current count: ${signatureCount}, needed count: ${confirmationCountNeeded(validatorCountInChain)}`)
                signatureCount = Number(await storageContract.getStakingSignaturesCount(publicWalletAddress));
                validatorCountInChain = Number(await bridgeContract.validatorsCount());
            }

            const stakingSignatures = [...(await storageContract.getStakingSignatures(publicWalletAddress))].map(item => {
                return {
                    signerAddress: item.signerAddress,
                    signature: item.signature
                }
            });

            let isFunded = false;

            while (!isFunded) {
                // @TODO handle staking + intial fund case 
                isFunded = await isChainFunded();
                if (!isFunded)
                    await waitForKeyPress("Press [Enter] key after funding your addresses")
            }

            const addValidatorTx = await bridgeContract.addValidator(publicWalletAddress, stakingSignatures);
            await addValidatorTx.wait();
            console.info(`Added self as validator in chain: ${chainConfig.chain}, txHash: ${addValidatorTx.hash}`);

            failiure = false;

        } catch (e) {
            console.info(e)
            await waitForMSWithMsg(processDelayMilliseconds, `Something went wrong in handleValidatorAddition chain ${chainConfig.chain}`)
        }
    }

}

export default handleValidatorAddition