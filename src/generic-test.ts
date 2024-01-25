/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
    Bridge__factory,
    ERC721Royalty,
    ERC721Royalty__factory,
} from './contractsTypes';
import {
    getEvmBridgeContract,
    getEvmSingleNftContract,
    getStorageContract,
    getTezosBridgeContract,
    waitForMSWithMsg,
} from './utils';
import {
    IEvmChainConfig,
    ITezosChainConfig,
    SignerAndSignature,
} from './types';
import {
    getEvmSignedNftDetails,
    getNftDetails,
    getTezosSignedNftDetails,
} from './modules/validator/components/nftLockListener/utils';

import { CodeInfo } from './utils/functions/getSecretBridgeContract';

import getLockEventDecodedLog from './modules/validator/components/nftLockListener/components/evmLockListener/utils/getLockEventDecodedLog';
import { LogObject } from '@src/modules/validator/utils/evmContractListener/types';
import { getContractOperations } from './modules/validator/utils/tezosContractListener';
import {
    ILog,
    ITransactions,
} from './modules/validator/utils/tezosContractListener/types';
import { extractStrOrAddr } from './modules/validator/components/nftLockListener/components/tezosLockListener/utils/getTezosLockListenerHandler';
import { TezosToolkit } from '@taquito/taquito';
import { INftTransferDetailsObject } from './modules/validator/components/nftLockListener/components/types';

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
            cdMapper: (cd: INftTransferDetailsObject) => {
                return cd;
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
            cdMapper: (cd: INftTransferDetailsObject) => {
                return cd;
            },
        },
        tezos: {
            signer: new InMemorySigner(genWallets.tezosWallet.secretKey),
            bridge: getTezosBridgeContract({
                tezosChainConfig: configs.tezos,
                tezosWallet: genWallets.tezosWallet,
            }),
            config: configs.tezos,
            logDecoder: (log: LogObject) => {
                const data = log as ILog & { transaction_hash: string };
                const sourceNftContractAddress = extractStrOrAddr(
                    data.source_nft_address,
                );
                const {
                    token_id: tokenId, // Unique ID for the NFT transfer
                    dest_chain: destinationChain, // Chain to where the NFT is being transferred
                    dest_address: destinationUserAddress, // User's address in the destination chain
                    token_amount: tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
                    nft_type: nftType, // Sigular or multiple ( 721 / 1155)
                    source_chain: sourceChain, // Source chain of NFT
                    transaction_hash: transactionHash,
                } = data;
                return {
                    tokenId,
                    destinationChain,
                    destinationUserAddress,
                    tokenAmount,
                    nftType,
                    sourceChain,
                    transactionHash,
                    sourceNftContractAddress,
                };
            },
            signedNftDetails: getTezosSignedNftDetails,
            address: await new InMemorySigner(
                genWallets.tezosWallet.secretKey,
            ).publicKeyHash(),
            extractLogFromTx: async (block: string): Promise<LogObject> => {
                const Tezos = new TezosToolkit(configs.tezos.rpcURL);
                const logs: ITransactions[] = await getContractOperations({
                    contractAddress: configs.tezos.contractAddress,
                    fromLevel: parseInt(block) - 1,
                    toLevel: (await Tezos.rpc.getBlockHeader()).level,
                    restApiURL: configs.tezos.restApiURL,
                });
                let payload = undefined;
                for (const log of logs) {
                    payload = log.payload;
                }
                return payload! as LogObject;
            },
            cdMapper: (nftTransferDetailsObject: INftTransferDetailsObject) => {
                return {
                    token_id: nftTransferDetailsObject.tokenId,
                    source_chain: nftTransferDetailsObject.sourceChain,
                    dest_chain: nftTransferDetailsObject.destinationChain,
                    dest_address:
                        nftTransferDetailsObject.destinationUserAddress,
                    source_nft_contract_address:
                        nftTransferDetailsObject.sourceNftContractAddress,
                    name: nftTransferDetailsObject.name,
                    symbol: nftTransferDetailsObject.symbol,
                    royalty: nftTransferDetailsObject.royalty,
                    royalty_receiver: nftTransferDetailsObject.royaltyReceiver,
                    metadata: nftTransferDetailsObject.metadata,
                    transaction_hash: nftTransferDetailsObject.transactionHash,
                    token_amount: nftTransferDetailsObject.tokenAmount,
                    nft_type: nftTransferDetailsObject.nftType,
                    fee: nftTransferDetailsObject.fee,
                };
            },
        },
    };

    // Create a NFT Contract
    console.log(`Deploying NFT Contract on BSC`);
    let contract: ERC721Royalty;
    let deployed = false;

    while (!deployed) {
        try {
            contract = await createNftOnEvm(
                data.bsc.signer.connect(
                    new JsonRpcProvider(data.bsc.config.rpcURL),
                ),
            );
            deployed = true;
        } catch (e) {
            `Retrying to deploy NFT Contract on BSC`;
        }
    }

    // Mint 5 NFT on the contract
    for (let i = 0; i < 2; i++) {
        let minted = false;
        while (!minted) {
            try {
                await contract!.mint(
                    signers.bsc.address,
                    i,
                    10,
                    signers.bsc.address,
                    'https://meta.polkamon.com/meta?id=10001852306',
                );
                minted = true;
            } catch (e) {
                console.log(`Retrying to mint NFT on BSC`);
            }
        }
    }
    console.log('Minted 2 NFTs ON BSC');

    // Approve the contract to spend the NFTs
    const nftC = getEvmSingleNftContract(
        {
            contractAddress: await contract!.getAddress(),
            rpcURL: configs.bsc.rpcURL,
        },
        data.bsc.signer.connect(new JsonRpcProvider(data.bsc.config.rpcURL)),
    );
    for (let i = 0; i < 2; i++) {
        let approved = false;
        while (!approved) {
            try {
                await nftC.approve(BigInt(i), data.bsc.config.contractAddress);
                approved = true;
            } catch (e) {
                console.log(`Retrying to approve NFT on BSC`);
            }
        }
    }
    console.log(`Approved NFTs on BSC`);

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
            await from.wait();
            console.log(`Locked on ${tx.fromChain.config.chain} ${from.hash}`);

            await new Promise((e) => setTimeout(e, 10000));

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

            const signatureArray: SignerAndSignature[] = [];
            signatures.forEach((item) => {
                signatureArray.push({
                    signer: item.signerAddress,
                    signature: item.signature,
                });
            });

            console.log(signatures);

            const claimTx = await tx.toChain.bridge.claimNFT721(
                tx.toChain.cdMapper(nftTransferDetailsObject) as unknown as any,
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
            toChain: data.tezos,
            contractAddress: await contract!.getAddress(),
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
    await contract.deploymentTransaction()?.wait();
    return contract;
}
