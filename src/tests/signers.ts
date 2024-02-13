import { UserSigner } from '@multiversx/sdk-wallet/out';
import { IGeneratedWallets } from '@src/types';
import { InMemorySigner } from '@taquito/signer';
import { Wallet } from 'ethers';
import { keyPairFromSecretKey } from 'ton-crypto';
import { Wallet as SecretWallet } from 'secretjs';

export function getSigners(genWallets: IGeneratedWallets) {
    return {
        bsc: new Wallet(genWallets.evmWallet.privateKey),
        eth: new Wallet(genWallets.evmWallet.privateKey),
        tezos: new InMemorySigner(genWallets.tezosWallet.secretKey),
        multiversx: UserSigner.fromWallet(
            genWallets.multiversXWallet.userWallet,
            genWallets.multiversXWallet.password,
        ),
        secret: new SecretWallet(genWallets.secretWallet.privateKey),
        ton: keyPairFromSecretKey(
            Buffer.from(genWallets.tonWallet.secretKey, 'hex'),
        ),
    };
}
