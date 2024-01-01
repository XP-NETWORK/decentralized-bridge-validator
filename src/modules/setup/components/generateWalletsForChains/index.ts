import { ethers } from 'ethers';
import { readJsonFile } from '@src/utils';
import { isGeneratedWallets } from '@src/modules/setup/typesGuardRuntime';
import { promises as fs } from 'fs';
import { IGeneratedWallets } from '@src/types';
import { Mnemonic, UserWallet } from '@multiversx/sdk-wallet/out';
import { Wallet as secretWallet } from "secretjs";
import TonWeb from 'tonweb';
import { InMemorySigner } from '@taquito/signer';
import * as bip39 from "bip39";
import sodium from "libsodium-wrappers-sumo";
import base58check from "bs58check";

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
    const wallet = new secretWallet();

    return {
        publicKey: Buffer.from(wallet.publicKey).toString("hex"),
        privateKey: Buffer.from(wallet.privateKey).toString("hex")
    }
}

const generateTezosWallet = async () => {
    const mnemonic = bip39.generateMnemonic(256);
    const seed = await bip39.mnemonicToSeed(mnemonic, "");
    await sodium.ready;
    const keys = sodium.crypto_sign_seed_keypair(seed.slice(0, 32), "hex");
    const b58encodedSecret = base58check.encode(Buffer.from("2bf64e07" + keys.privateKey, "hex"));
    const tezosSigner = await InMemorySigner.fromSecretKey(b58encodedSecret);

    return {
        publicKey: await tezosSigner.publicKey(),
        secretKey: await tezosSigner.secretKey()
    }
}

const generateWalletsForChains_ = async (): Promise<IGeneratedWallets> => {

    const evmWallet = generateEvmWallet();
    const multiversXWallet = generateMultiversXWallet();
    const tonWallet = generateTonWallet();
    const secretWallet = generateSecretWallet();
    const tezosWallet = await generateTezosWallet();

    const generatedWAllets: IGeneratedWallets = {
        evmWallet,
        multiversXWallet,
        tonWallet,
        secretWallet,
        tezosWallet
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
        wallets = await generateWalletsForChains_();
        await fs.writeFile(secretsFile, JSON.stringify(wallets));
    }

    return wallets;
};


export default generateWalletsForChains