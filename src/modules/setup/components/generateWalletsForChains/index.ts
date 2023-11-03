import { ethers } from 'ethers';
import { readJsonFile } from '@src/utils';
import { isGeneratedWallets } from '@src/modules/setup/typesGuardRuntime';
import { promises as fs } from 'fs';
import { IGeneratedWallets } from '@src/types';
import { Mnemonic, UserWallet } from '@multiversx/sdk-wallet/out';

const generateMultiversXWallet = () => {
    const mnemonic = Mnemonic.generate();
    const secretKey = mnemonic.deriveKey(0);
    const password = Math.random().toString(36).slice(2);
    const userWallet = UserWallet.fromSecretKey({ secretKey, password });
    return { userWallet: userWallet.toJSON(), password };
};

const generateWalletsForChains_ = (): IGeneratedWallets => {

    const evmWallet = ethers.Wallet.createRandom();
    const multiversXWallet = generateMultiversXWallet();

    const generatedWAllets: IGeneratedWallets = {
        evmWallet: {
            address: evmWallet.address,
            privateKey: evmWallet.privateKey
        },
        multiversXWallet: multiversXWallet
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
        console.info("existing secrets found");
    } catch (error) {
        console.info("generating new secrets");
        wallets = generateWalletsForChains_();
        await fs.writeFile(secretsFile, JSON.stringify(wallets));
    }

    return wallets;
};


export default generateWalletsForChains