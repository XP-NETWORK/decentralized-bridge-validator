import { createInterface } from 'node:readline';

import { JsonRpcProvider, Wallet, isAddress } from 'ethers';
import { ERC721Royalty__factory } from '@src/contractsTypes';
import { IEvmChainConfigAndEvmWallet } from '@src/types';

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

function question(query: string) {
    return new Promise<string>((resolve) => {
        readline.question(query, resolve);
    });
}

export async function deployEVMNftContract(
    tchain: IEvmChainConfigAndEvmWallet,
) {
    const sa = await question(
        'To Deploy new contract press Y or pass a nft Contract Address',
    );
    const is = isAddress(sa);
    if (is) {
        return ERC721Royalty__factory.connect(
            sa,
            new JsonRpcProvider(tchain.evmChainConfig.rpcURL),
        );
    } else {
        const wallet = new Wallet(
            tchain.evmWallet.privateKey,
            new JsonRpcProvider(tchain.evmChainConfig.rpcURL),
        );
        const factory = new ERC721Royalty__factory(wallet);
        const contract = await factory.deploy(
            'TestContract',
            'TC',
            wallet.address,
        );
        return contract;
    }
}
