import { ethers } from 'ethers';
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
    const secretsFile = 'src/config/secrets.json';
    let wallets: IGeneratedWallets | null = null;

    try {
        wallets = await readJsonFile(secretsFile);
        if (!isGeneratedWallets(wallets)) {
            throw new Error("Invalid secrets in file");
        }
        console.log("existing secrets found");
    } catch (error) {
        console.log("generating new secrets");
        wallets = generateWalletsForChains_();
        await fs.writeFile(secretsFile, JSON.stringify(wallets));
    }

    return wallets;
};


export default generateWalletsForChains