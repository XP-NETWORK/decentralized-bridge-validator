import { IChain, IChainSpecs } from "../../../../config/types";
import { getCurrentBalance } from "../../../../utils/functions";
import { IGeneratedWallets, IWalletConfig } from "../../types";
import { ethers } from 'ethers';


const promptToGetFunding = async (wallets: IGeneratedWallets, config: IChainSpecs): Promise<boolean> => {

    let isNotFullyFunded = false;
    // Optimism fund promt
    const optimismInitialFund = config.optimismChain.intialFund
    const currentOptimismBalance = await getCurrentBalance({ rpc: config.optimismChain.rpc, accAddress: wallets.optimismChainWallet.address });
    const remainingOptimismRaw = (optimismInitialFund) - BigInt(currentOptimismBalance);
    const remainingOptimismFund = ethers.formatEther(remainingOptimismRaw);
    if (currentOptimismBalance < optimismInitialFund) {
        isNotFullyFunded = true
        console.log(`Current balance: ${ethers.formatEther(currentOptimismBalance)}; Fund chain your wallet ${wallets.optimismChainWallet.address} with ${remainingOptimismFund} ${wallets.optimismChainWallet.chain}.`);
    }
    // Bridge chains fund promt
    for (const wallet of wallets.bridgeChainsWallet) {
        const currentChain: IChain | undefined = config.bridgeChains.find(item => item.chain === wallet.chain);
        const currentBalance = await getCurrentBalance({ rpc: currentChain?.rpc, accAddress: wallet.address });
        const remainingRaw = ((currentChain?.intialFund || BigInt("0")) - BigInt(currentBalance))
        const remainingFund = ethers.formatEther(remainingRaw)
        if (currentBalance < (currentChain?.intialFund || BigInt("0"))) {
            isNotFullyFunded = true
            console.log(`Current balance: ${ethers.formatEther(currentBalance)}; Fund chain your wallet ${wallet.address} on ${currentChain?.chain} with ${remainingFund} ${currentChain?.nativeCoinSymbol}.`);
        }
    }

    // Staking coin fund promt
    const stakingWallet: IWalletConfig | undefined = wallets.bridgeChainsWallet.find(item => item.chain === config.stakingConfig.chain);
    const stakingCoinCurrentBalance = await getCurrentBalance({ rpc: config.stakingConfig.rpc, accAddress: stakingWallet?.address , coinAddress: config.stakingConfig.coinAddress});
    const remainingStakingCoinRaw = ((config.stakingConfig?.intialFund) - BigInt(stakingCoinCurrentBalance));
    const remainingStakingCoinFund = ethers.formatEther(remainingStakingCoinRaw);
    if (stakingCoinCurrentBalance < (config.stakingConfig?.intialFund)) {
        isNotFullyFunded = true
        console.log(`Current balance: ${ethers.formatEther(stakingCoinCurrentBalance)}; Fund chain your wallet ${stakingWallet?.address} on ${config.stakingConfig?.chain} with ${remainingStakingCoinFund} ${config.stakingConfig?.coinSymbol} [ Coin address ${config.stakingConfig.coinAddress}].`);
    }
    if (isNotFullyFunded) {
        console.log("To stake and initialize your node.");
    } else {
        console.log("Initializing your node");
    }
    return isNotFullyFunded
};

export default promptToGetFunding