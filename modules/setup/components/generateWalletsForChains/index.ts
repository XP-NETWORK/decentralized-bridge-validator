import { ethers } from 'ethers';
import { IChainSpecs } from '../../../../config/types'; // Update the path accordingly
import { IGeneratedWallets, IWalletConfig } from '../../types';

const generateWalletsForChains = (specs: IChainSpecs): IGeneratedWallets => {


    const bridgeChainsWallet: IWalletConfig[] = []
    const wallet = ethers.Wallet.createRandom();

    const optimismChainWallet: IWalletConfig = {
        chain: specs.optimismChain.chain,
        address: wallet.address,
        privateKey: wallet.privateKey
    }

    for (const chainSpec of specs.bridgeChains) {
        const wallet = ethers.Wallet.createRandom();

        bridgeChainsWallet.push({
            chain: chainSpec.chain,
            address: wallet.address,
            privateKey: wallet.privateKey
        });
    }


    return {
        optimismChainWallet,
        bridgeChainsWallet
    };
};

export default generateWalletsForChains