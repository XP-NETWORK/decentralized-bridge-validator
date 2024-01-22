import { JsonRpcProvider, Wallet } from 'ethers';
import { generateWalletsForChains } from '../modules/setup/components';
import { Wallet as SecretWallet } from 'secretjs';
import { InMemorySigner } from '@taquito/signer';
import { UserSigner } from '@multiversx/sdk-wallet/out';
import { keyPairFromSecretKey } from 'ton-crypto';
import { bridgeTestChains, testnetBridgeConfig } from '../config/chainSpecs';
import { ERC721Royalty__factory } from '../contractsTypes';
import {
    getEvmBridgeContract,
    getEvmSingleNftContract,
    getStorageContract,
} from '../utils';
import { IEvmChainConfig } from '../types';

(async () => {
    const genWallets = await generateWalletsForChains();
    // Assuming we have enough funds on the validator accounts itself.
    const signers = {
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
    const configs = {
        bsc: bridgeTestChains.find(
            (e) => e.chain === 'BSC',
        )! as IEvmChainConfig,
        eth: bridgeTestChains.find(
            (e) => e.chain === 'ETH',
        )! as IEvmChainConfig,
    };

    const data = {
        storage: getStorageContract({
            evmChainConfig: testnetBridgeConfig.storageConfig,
            evmWallet: genWallets.evmWallet,
        }),
        bsc: {
            signer: new Wallet(genWallets.evmWallet.privateKey),
            bridge: getEvmBridgeContract({
                evmChainConfig: configs.bsc,
                evmWallet: genWallets.evmWallet,
            }),
            config: configs.bsc,
        },
        eth: {
            signer: new Wallet(genWallets.evmWallet.privateKey),
            bridge: getEvmBridgeContract({
                evmChainConfig: configs.eth,
                evmWallet: genWallets.evmWallet,
            }),
            config: configs.eth,
        },
    };

    // Create a NFT Contract

    const contract = await createNftOnEvm(
        data.bsc.signer.connect(new JsonRpcProvider(data.bsc.config.rpcURL)),
    );

    // Mint 5 NFT on the contract
    for (let i = 0; i < 5; i++) {
        await contract.mint(
            signers.bsc.address,
            i,
            10,
            signers.bsc.address,
            'https://meta.polkamon.com/meta?id=10001852306',
        );
    }
    console.log('Minted 5 NFTs ON BSC');

    // Approve the contract to spend the NFTs
    const nftC = getEvmSingleNftContract(
        {
            contractAddress: await contract.getAddress(),
            rpcURL: configs.bsc.rpcURL,
        },
        data.bsc.signer.connect(new JsonRpcProvider(data.bsc.config.rpcURL)),
    );
    for (let i = 0; i < 5; i++) {
        await nftC.approve(BigInt(i), data.bsc.config.contractAddress);
    }

    // Lock the NFTs
    const lockTx = await data.bsc.bridge.lock721(
        await contract.getAddress(),
        '0',
        'ETH',
        signers.eth.address,
    );

    // Wait for the NFTs to be locked
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // Fetch the signatures
    const signatures = await data.storage.getLockNftSignatures(
        lockTx.hash,
        'BSC',
    );

    const signatureArray: string[] = [];
    signatures.forEach((item) => {
        signatureArray.push(item[1]);
    });

    const claimData = {
        tokenId: '0',
        sourceChain: 'BSC',
        destinationChain: 'ETH',
        destinationUserAddress: signers.eth.address,
        sourceNftContractAddress: await contract.getAddress(),
        name: 'TestContract',
        symbol: 'TC',
        royalty: '10',
        royaltyReceiver: signers.bsc.address,
        metadata: 'https://meta.polkamon.com/meta?id=10001852306',
        transactionHash: lockTx.hash,
        tokenAmount: '1',
        nftType: 'singular',
        fee: '100000000000000',
    };

    // Unlock it on the destination chain
    const claimed = await data.eth.bridge.claimNFT721(
        claimData,
        signatureArray,
    );

    console.log(claimed);
})();

async function createNftOnEvm(signer: Wallet) {
    const contract = await new ERC721Royalty__factory(signer).deploy(
        'TestContract',
        'TC',
        signer.address,
    );
    return contract;
}
