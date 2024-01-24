import { JsonRpcProvider, Wallet } from 'ethers';
import { generateWalletsForChains } from './modules/setup/components';
import { Wallet as SecretWallet } from 'secretjs';
import { InMemorySigner } from '@taquito/signer';
import { UserSigner } from '@multiversx/sdk-wallet/out';
import { keyPairFromSecretKey } from 'ton-crypto';
import {
    SupportedChains,
    bridgeTestChains,
    testnetBridgeConfig,
} from './config/chainSpecs';
import { Bridge__factory, ERC721Royalty__factory } from './contractsTypes';
import {
    getEvmBridgeContract,
    getEvmSingleNftContract,
    getStorageContract,
    waitForMSWithMsg,
} from './utils';
import { IEvmChainConfig, ITezosChainConfig } from './types';
import {
    getEvmSignedNftDetails,
    getNftDetails,
} from './modules/validator/components/nftLockListener/utils';

import { CodeInfo } from './utils/functions/getSecretBridgeContract';

import getLockEventDecodedLog from './modules/validator/components/nftLockListener/components/evmLockListener/utils/getLockEventDecodedLog';
import { LogObject } from '@src/modules/validator/utils/evmContractListener/types';

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
        tezos: bridgeTestChains.find(
            (e) => e.chain === 'TEZOS',
        )! as ITezosChainConfig,
    };
    const storage = getStorageContract({
        evmChainConfig: testnetBridgeConfig.storageConfig,
        evmWallet: genWallets.evmWallet,
    });

    const data = {
        bsc: {
            signer: new Wallet(genWallets.evmWallet.privateKey),
            bridge: getEvmBridgeContract({
                evmChainConfig: configs.bsc,
                evmWallet: genWallets.evmWallet,
            }),
            config: configs.bsc,
            logDecoder: getLockEventDecodedLog,
            signedNftDetails: getEvmSignedNftDetails,
            address: genWallets.evmWallet.address,
            extractLogFromTx: async (hash: string): Promise<LogObject> => {
                const { topicHash } =
                    Bridge__factory.createInterface().getEvent('Locked');
                const provider = new JsonRpcProvider(configs.bsc.rpcURL);
                const receipt = await provider.getTransactionReceipt(hash)!;

                return (receipt?.logs.filter(
                    (e) => e.topics.includes(topicHash),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ) ?? [])[0] as unknown as any;
            },
        },
        eth: {
            signer: new Wallet(genWallets.evmWallet.privateKey),
            bridge: getEvmBridgeContract({
                evmChainConfig: configs.eth,
                evmWallet: genWallets.evmWallet,
            }),
            config: configs.eth,
            logDecoder: getLockEventDecodedLog,
            signedNftDetails: getEvmSignedNftDetails,
            address: genWallets.evmWallet.address,
            extractLogFromTx: async (hash: string): Promise<LogObject> => {
                const { topicHash } =
                    Bridge__factory.createInterface().getEvent('Locked');
                const provider = new JsonRpcProvider(configs.bsc.rpcURL);
                const receipt = await provider.getTransactionReceipt(hash)!;

                return (receipt?.logs.filter(
                    (e) => e.topics.includes(topicHash),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ) ?? [])[0] as unknown as any;
            },
        },
        // tezos: {
        //     signer: new InMemorySigner(genWallets.tezosWallet.secretKey),
        //     bridge: getTezosBridgeContract({
        //         tezosChainConfig: configs.tezos,
        //         tezosWallet: genWallets.tezosWallet,
        //     }),
        //     config: configs.eth,
        //     logDecoder: (log: LogObject) => log,
        //     signedNftDetails: getTezosSignedNftDetails,
        //     address: genWallets.evmWallet.address,
        //     extractLogFromTx: async (hash: string): Promise<LogObject> => {
        //        throw new Error(`Not implemented`)
        //     },
        // },
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
    async function transfer(
        args: [
            {
                fromChain: (typeof data)[keyof typeof data];
                toChain: (typeof data)[keyof typeof data];
                tokenId: string;
                contractAddress: string;
                codeInfo?: CodeInfo;
                nftType: 'singular' | 'multiple';
            },
        ],
    ) {
        for (const tx of args) {
            const from = await tx.fromChain.bridge.lock721({
                address: tx.toChain.address,
                destinationChain: tx.toChain.config.chain as SupportedChains,
                sourceNftContractAddress: tx.contractAddress,
                tokenId: tx.tokenId,
            });
            const log = await tx.fromChain.extractLogFromTx(from.hash);
            const {
                tokenId, // Unique ID for the NFT transfer
                destinationChain, // Chain to where the NFT is being transferred
                destinationUserAddress, // User's address in the destination chain
                sourceNftContractAddress, // Address of the NFT contract in the source chain
                tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
                nftType, // Sigular or multiple ( 721 / 1155)
                sourceChain, // Source chain of NFT
            } = tx.fromChain.logDecoder({
                log: log,
            });

            // if user gives a destination chain which is not registered with us, we early return
            const sourceChain_ = tx.fromChain.config;

            const fee = String(await storage.chainFee(tx.toChain.config.chain)); // Required fee for claming nft on target chain
            const royaltyReceiver = String(
                await storage.chainRoyalty(tx.toChain.config.chain),
            );

            const { royalty, name, symbol, metadata } = await getNftDetails({
                sourceNftContractAddress,
                sourceChain: sourceChain_,
                tokenId,
                nftType,
            });

            const nftTransferDetailsObject = {
                tokenId,
                sourceChain,
                destinationChain,
                destinationUserAddress,
                sourceNftContractAddress,
                name,
                symbol,
                royalty,
                royaltyReceiver,
                metadata,
                transactionHash: from.hash,
                tokenAmount,
                nftType,
                fee,
            };
            let signatures = await storage.getLockNftSignatures(
                from.hash,
                tx.fromChain.config.chain,
            );
            const neededSignatures =
                Math.floor(
                    (2 / 3) * Number(await tx.toChain.bridge.validatorsCount()),
                ) + 1;
            while (signatures.length < neededSignatures) {
                await waitForMSWithMsg(
                    1000,
                    `waiting for signatures, ${signatures.length}`,
                );
                signatures = await storage.getLockNftSignatures(
                    from.hash,
                    tx.fromChain.config.chain,
                );
            }

            const signatureArray: string[] = [];
            signatures.forEach((item) => {
                signatureArray.push(item[1]);
            });

            console.log(signatures);

            const claimTx = await tx.toChain.bridge.claimNFT721(
                nftTransferDetailsObject,
                signatureArray,
            );
            await claimTx.wait();

            return claimTx.hash;
        }
        return '';
    }

    await transfer([
        {
            fromChain: data.bsc,
            toChain: data.eth,
            contractAddress: await contract.getAddress(),
            tokenId: '1',
            nftType: 'singular',
        },
    ]);
})();

async function createNftOnEvm(signer: Wallet) {
    const contract = await new ERC721Royalty__factory(signer).deploy(
        'TestContract',
        'TC',
        signer.address,
    );
    return contract;
}
