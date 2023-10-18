import { ethers } from 'ethers';
import { IGeneratedWallets } from '../../types';

const generateWalletsForChains = (): IGeneratedWallets => {

    const wallet = ethers.Wallet.createRandom();

    const generatedWAllets: IGeneratedWallets = {
        evmWallet :{
            address: wallet.address,
            privateKey: wallet.privateKey
        }
    }

    return generatedWAllets
};

export default generateWalletsForChains