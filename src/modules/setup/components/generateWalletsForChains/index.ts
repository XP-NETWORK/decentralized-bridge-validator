import { ethers } from 'ethers';
import { readJsonFile } from '@src/utils';
import { isGeneratedWallets } from '@src/modules/setup/typesGuardRuntime';
import { promises as fs } from 'fs';
import { IGeneratedWallets } from '@src/types';
import { Mnemonic, UserWallet } from '@multiversx/sdk-wallet/out';
import { Wallet } from "secretjs";

import TonWeb from 'tonweb';

const generateEvmWallet = () => {
    const evmWallet = ethers.Wallet.createRandom();
    return {
        address: evmWallet.address,
        privateKey: evmWallet.privateKey
    }

}
const generateMultiversXWallet = () => {
    const mnemonic = Mnemonic.generate();
    const secretKey = mnemonic.deriveKey(0);
    const password = Math.random().toString(36).slice(2);
    const userWallet = UserWallet.fromSecretKey({ secretKey, password });
    return { userWallet: userWallet.toJSON(), password };
};


const generateTonWallet = () => {

    const KeyPair = TonWeb.utils.nacl.sign.keyPair();

    return {
        publicKey: TonWeb.utils.bytesToHex(KeyPair.publicKey),
        secretKey: TonWeb.utils.bytesToHex(KeyPair.secretKey)
    }
}

const generateSecretWallet = () => {
    const wallet = new Wallet();

    return {
        publicKey: wallet.address,
        memonic: wallet.mnemonic
    }
}

const generateWalletsForChains_ = (): IGeneratedWallets => {

    const evmWallet = generateEvmWallet();
    const multiversXWallet = generateMultiversXWallet();
    const tonWallet = generateTonWallet();
    const secretWallet = generateSecretWallet();

    const generatedWAllets: IGeneratedWallets = {
        evmWallet,
        multiversXWallet,
        tonWallet,
        secretWallet
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