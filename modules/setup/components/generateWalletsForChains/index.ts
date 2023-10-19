import { ethers } from 'ethers';
import { IGeneratedWallets } from '../../types';
import { readJsonFile } from '../../../../utils';
import { isGeneratedWallets } from '../../typesGuardRuntime';
import { promises as fs } from 'fs';

const generateWalletsForChains_ = (): IGeneratedWallets => {

    const wallet = ethers.Wallet.createRandom();

    const generatedWAllets: IGeneratedWallets = {
        evmWallet: {
            address: wallet.address,
            privateKey: wallet.privateKey
        }
    }

    return generatedWAllets
};


const generateWalletsForChains = async (): Promise<IGeneratedWallets> => {
    const secretsFile = 'config/secrets.json';
    let wallets: IGeneratedWallets = await readJsonFile(secretsFile)
    if (isGeneratedWallets(wallets)) {
        console.log("existing secrets found")
    } else {
        console.log("generating new secrets")
        wallets = generateWalletsForChains_()
        await fs.writeFile(secretsFile, JSON.stringify(wallets));
    }
    return wallets
};

export default generateWalletsForChains