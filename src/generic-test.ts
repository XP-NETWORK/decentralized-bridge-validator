/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcProvider, Wallet } from 'ethers';
import { generateWalletsForChains } from './modules/setup/components';
import { SecretNetworkClient, Wallet as SecretWallet } from 'secretjs';
import { InMemorySigner } from '@taquito/signer';
import { UserSigner } from '@multiversx/sdk-wallet/out';
import { keyPairFromSecretKey } from 'ton-crypto';
import { ClaimData as TonClaimData } from '@src/contractsTypes/contracts/tonBridge';
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
    getHederaBridgeContract,
    getMultiversXBridgeContract,
    getStorageContract,
    getTezosBridgeContract,
    getTonBridgeContract,
    waitForMSWithMsg,
} from './utils';
import {
    IEvmChainConfig,
    IHederaChainConfig,
    IMultiversXChainConfig,
    ISecretChainConfig,
    ITezosChainConfig,
    ITonChainConfig,
    SignerAndSignature,
} from './types';
import {
    getEvmSignedNftDetails,
    getMultiversXSignedNftDetails,
    getNftDetails,
    getSecretSignedNftDetails,
    getTezosSignedNftDetails,
    getTonSignedNftDetails,
} from './modules/validator/components/nftLockListener/utils';

import getSecretBridgeContract, {
    ClaimData,
    CodeInfo,
} from './utils/functions/getSecretBridgeContract';
import { getLockEventDecodedLog as getMxLockEventDecodedLog } from './modules/validator/components/nftLockListener/components/multiversXLockListener/utils';
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
import { ClaimStruct } from './utils/functions/getMultiversXBridgeContract';
import axios from 'axios';
import {
    IMultiverseXLogEvent,
    IMultiverseXLogs,
} from './modules/validator/utils/multiversXContractListener/utils/types';
import { TezosClaimArgs } from './utils/functions/getTezosBridgeContract';
import { tas } from './contractsTypes/tezosContractTypes/type-aliases';

import { WalletContractV4 } from 'ton';
import { Address, TonClient, beginCell } from '@ton/ton';
import { loadLockedEvent } from './contractsTypes/contracts/tonBridge';
import TonWeb from 'tonweb';
import { SalePriceToGetTotalRoyalityPercentage } from './utils/constants/salePriceToGetTotalRoyalityPercentage';

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
        hedera: bridgeTestChains.find(
            (e) => e.chain === 'HEDERA',
        )! as IHederaChainConfig,
        tezos: bridgeTestChains.find(
            (e) => e.chain === 'TEZOS',
        )! as ITezosChainConfig,
        multiversx: bridgeTestChains.find(
            (e) => e.chain === 'MULTIVERSX',
        )! as IMultiversXChainConfig,
        secret: bridgeTestChains.find(
            (e) => e.chain === 'SECRET',
        )! as ISecretChainConfig,
        ton: bridgeTestChains.find(
            (e) => e.chain === 'TON',
        )! as ITonChainConfig,
    };
    const tonweb = new TonWeb(new TonWeb.HttpProvider(configs.ton.rpcURL));

    const walletClass = tonweb.wallet.all['v4R2'];

    const wallet = new walletClass(tonweb.provider, {
        publicKey: TonWeb.utils.hexToBytes(genWallets.tonWallet.publicKey),
    });
    console.log((await wallet.getAddress()).toString(true));
    // await new Wallet(
    //     '1f74ccfcfa2387a2a9a3fd65034d39fcbae72a59e366b48f437fa1822fce6d0d',
    //     new JsonRpcProvider(configs.bsc.rpcURL),
    // ).sendTransaction({
    //     to: genWallets.evmWallet.address,
    //     value: '500000000000000000',
    // });
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
        hedera: {
            signer: new Wallet(genWallets.evmWallet.privateKey),
            bridge: getHederaBridgeContract({
                hederaChainConfig: configs.hedera,
                evmWallet: genWallets.evmWallet,
            }),
            config: configs.hedera,
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
        multiversx: {
            signer: UserSigner.fromWallet(
                genWallets.multiversXWallet.userWallet,
                genWallets.multiversXWallet.password,
            ),
            config: configs.multiversx,
            address: genWallets.multiversXWallet.userWallet.address,
            bridge: getMultiversXBridgeContract({
                multiversXChainConfig: configs.multiversx,
                multiversXWallet: genWallets.multiversXWallet,
            }),
            signedNftDetails: getMultiversXSignedNftDetails,
            cdMapper: (cd: INftTransferDetailsObject): ClaimStruct => {
                return { ...cd, attrs: cd.metadata };
            },
            extractLogFromTx: async (hash: string): Promise<LogObject> => {
                const eventIdentifier = ['lock721', 'lock1155'];
                const resultantLogs: (IMultiverseXLogEvent & {
                    txHash: string;
                })[] = [];
                const incompleteTx: { [txHash: string]: boolean } = {};

                const getResultantLogs = (
                    logs: IMultiverseXLogs,
                    txHash: string,
                ) => {
                    const eventLog = logs.events.find((_event) => {
                        return eventIdentifier.includes(_event.identifier);
                    });
                    const isCompletedTx = logs.events.find(
                        (_event) => _event.identifier === 'completedTxEvent',
                    );
                    if (eventLog && isCompletedTx) {
                        resultantLogs.push({ ...eventLog, txHash });
                    } else if (eventLog && !isCompletedTx) {
                        incompleteTx[txHash] = true;
                    }
                };
                const response = (
                    await axios.get(
                        `${configs.multiversx.gatewayURL.replace('gateway', 'api')}/transactions/${hash}`,
                    )
                ).data;

                if (response?.logs) getResultantLogs(response.logs, hash);
                if (response?.results?.logs)
                    getResultantLogs(response.results.log, hash);
                if (response?.results.length > 0) {
                    for (const i of response.results) {
                        if (i?.logs) {
                            getResultantLogs(i.logs, hash);
                        }
                    }
                }
                return resultantLogs as any;
            },
            logDecoder: (log: LogObject) => {
                const data = log as (IMultiverseXLogEvent & {
                    txHash: string;
                })[];
                for (const log of data) {
                    const decodedLog = getMxLockEventDecodedLog({ log: log });
                    return decodedLog;
                }
                throw new Error(`No Log Found`);
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
            cdMapper: (
                nftTransferDetailsObject: INftTransferDetailsObject,
            ): TezosClaimArgs => {
                return {
                    token_id: tas.nat(nftTransferDetailsObject.tokenId),
                    source_chain: nftTransferDetailsObject.sourceChain,
                    dest_chain: nftTransferDetailsObject.destinationChain,
                    dest_address: tas.address(
                        nftTransferDetailsObject.destinationUserAddress,
                    ),
                    source_nft_contract_address:
                        nftTransferDetailsObject.sourceNftContractAddress,
                    name: nftTransferDetailsObject.name,
                    symbol: nftTransferDetailsObject.symbol,
                    royalty: tas.nat(nftTransferDetailsObject.royalty),
                    royalty_receiver: tas.address(
                        nftTransferDetailsObject.royaltyReceiver,
                    ),
                    metadata: nftTransferDetailsObject.metadata,
                    transaction_hash: nftTransferDetailsObject.transactionHash,
                    token_amount: tas.nat(nftTransferDetailsObject.tokenAmount),
                    nft_type: nftTransferDetailsObject.nftType,
                    fee: tas.mutez(nftTransferDetailsObject.fee),
                };
            },
        },
        secret: {
            signer: new SecretWallet(genWallets.secretWallet.privateKey),
            bridge: getSecretBridgeContract({
                secretChainConfig: configs.secret,
                secretWallet: genWallets.secretWallet,
            }),
            config: configs.secret,
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
            signedNftDetails: getSecretSignedNftDetails,
            address: genWallets.secretWallet.publicKey,
            extractLogFromTx: async (hash: string): Promise<LogObject> => {
                const eventId = 'LockedEventInfo';
                const secretjs = new SecretNetworkClient({
                    url: configs.secret.rpcURL,
                    chainId: configs.secret.chainId,
                });
                const tx = await secretjs.query.getTx(hash)!;
                if (!tx) {
                    throw new Error('Tx not found');
                }
                const log = tx.jsonLog
                    ?.at(0)
                    ?.events.find((item) => item.type === 'wasm')
                    ?.attributes.find((item) => item.key === eventId);
                const {
                    token_id: tokenId, // Unique ID for the NFT transfer
                    destination_chain: destinationChain, // Chain to where the NFT is being transferred
                    destination_user_address: destinationUserAddress, // User's address in the destination chain
                    source_nft_contract_address: sourceNftContractAddress, // Address of the NFT contract in the source chain
                    token_amount: tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
                    nft_type: nftType, // Sigular or multiple ( 721 / 1155)
                    source_chain: sourceChain, // Source chain of NFT
                } = JSON.parse(log!.value);
                return {
                    tokenId,
                    destinationChain,
                    destinationUserAddress,
                    sourceNftContractAddress,
                    tokenAmount,
                    nftType,
                    sourceChain,
                } as LogObject;
            },
            cdMapper: (
                nftTransferDetailsObject: INftTransferDetailsObject,
            ): ClaimData => {
                return {
                    token_id: nftTransferDetailsObject.tokenId,
                    source_chain: nftTransferDetailsObject.sourceChain,
                    destination_chain:
                        nftTransferDetailsObject.destinationChain,
                    destination_user_address:
                        nftTransferDetailsObject.destinationUserAddress,
                    source_nft_contract_address:
                        nftTransferDetailsObject.sourceNftContractAddress,
                    name: nftTransferDetailsObject.name,
                    symbol: nftTransferDetailsObject.symbol,
                    royalty: parseInt(nftTransferDetailsObject.royalty),
                    royalty_receiver: nftTransferDetailsObject.royaltyReceiver,
                    metadata: nftTransferDetailsObject.metadata,
                    transaction_hash: nftTransferDetailsObject.transactionHash,
                    token_amount: nftTransferDetailsObject.tokenAmount,
                    nft_type: nftTransferDetailsObject.nftType,
                    fee: nftTransferDetailsObject.fee,
                };
            },
        },
        ton: {
            signer: WalletContractV4.create({
                publicKey: Buffer.from(genWallets.tonWallet.publicKey, 'hex'),
                workchain: 0,
            }),

            bridge: getTonBridgeContract({
                tonChainConfig: configs.ton,
                tonWallet: genWallets.tonWallet,
            }),
            config: configs.ton,
            logDecoder: (data: any) => {
                const {
                    token_id: tokenId, // Unique ID for the NFT transfer
                    dest_chain: destinationChain, // Chain to where the NFT is being transferred
                    dest_address: destinationUserAddress, // User's address in the destination chain
                    token_amount: tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
                    nft_type: nftType, // Sigular or multiple ( 721 / 1155)
                    source_chain: sourceChain, // Source chain of NFT
                    transaction_hash: transactionHash,
                    source_nft_address: sourceNftContractAddress,
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
            signedNftDetails: getTonSignedNftDetails,
            address: genWallets.tonWallet.publicKey,
            extractLogFromTx: async () => {
                const client = new TonClient({
                    endpoint: configs.ton.rpcURL,
                    apiKey: 'f3f6ef64352ac53cdfca18a3ba5372983e4037182c2b510fc52de5a259ecf292',
                });
                const latestTx = await client.getTransactions(
                    Address.parseFriendly(configs.ton.contractAddress).address,
                    { limit: 1 },
                );
                for (const tx of latestTx) {
                    for (let i = 0; i < tx.outMessages.size; i++) {
                        const log = tx.outMessages.get(i)!;
                        const hash = tx.hash().toString('base64');
                        if (log.body.asSlice().loadUint(32) !== 3571773646) {
                            return;
                        }
                        const {
                            tokenId, // Unique ID for the NFT transfer
                            destinationChain, // Chain to where the NFT is being transferred
                            destinationUserAddress, // User's address in the destination chain
                            sourceNftContractAddress, // Address of the NFT contract in the source chain
                            tokenAmount, // amount of nfts to be transfered ( 1 in 721 case )
                            nftType, // Sigular or multiple ( 721 / 1155)
                            sourceChain, // Source chain of NFT
                        } = loadLockedEvent(log.body.asSlice());
                        const getSourceNftContractAddress = () => {
                            try {
                                return sourceNftContractAddress
                                    .asSlice()
                                    .loadAddress()
                                    .toString();
                            } catch (e) {
                                return sourceNftContractAddress
                                    .asSlice()
                                    .loadStringTail();
                            }
                        };

                        const nftTransferDetailsObject = {
                            tokenId: tokenId.toString(),
                            sourceChain,
                            destinationChain,
                            destinationUserAddress,
                            sourceNftContractAddress:
                                getSourceNftContractAddress(),
                            tokenAmount: tokenAmount.toString(),
                            nftType,
                            transactionHash: hash,
                        };
                        return nftTransferDetailsObject! as LogObject;
                    }
                }
                throw new Error(`No Log Found`);
            },
            cdMapper: (d: INftTransferDetailsObject): ClaimData => {
                // Mitigation if destination user address is invalid
                let destinationAddress: Address;
                try {
                    destinationAddress = Address.parseFriendly(
                        d.destinationUserAddress,
                    ).address;
                } catch (e) {
                    destinationAddress = Address.parseFriendly(
                        d.royaltyReceiver,
                    ).address;
                }

                // off chain condition to store sourceNftContractAddress as string if not native, and address if native
                let sourceNftContractAddress_ = beginCell()
                    .storeSlice(
                        beginCell()
                            .storeStringTail(d.sourceNftContractAddress)
                            .endCell()
                            .asSlice(),
                    )
                    .endCell();
                try {
                    sourceNftContractAddress_ = beginCell()
                        .storeSlice(
                            beginCell()
                                .storeAddress(
                                    Address.parseFriendly(
                                        d.sourceNftContractAddress,
                                    ).address,
                                )
                                .endCell()
                                .asSlice(),
                        )
                        .endCell();
                } catch (e) {
                    console.log('Not Native TON Address');
                }
                const data = {
                    $$type: 'ClaimData',
                    data1: {
                        $$type: 'ClaimData1',
                        destinationChain: d.destinationChain,
                        destinationUserAddress: destinationAddress,
                        tokenId: BigInt(d.tokenId),
                        sourceChain: d.sourceChain,
                        tokenAmount: BigInt(d.tokenAmount),
                    },
                    data2: {
                        $$type: 'ClaimData2',
                        name: d.name,
                        symbol: d.symbol,
                        nftType: d.nftType,
                    },
                    data3: {
                        $$type: 'ClaimData3',
                        fee: BigInt(d.fee),
                        metadata: d.metadata,
                        royaltyReceiver: Address.parseFriendly(
                            d.royaltyReceiver,
                        ).address,
                        sourceNftContractAddress: sourceNftContractAddress_,
                    },
                    data4: {
                        $$type: 'ClaimData4',
                        royalty: {
                            $$type: 'RoyaltyParams',
                            numerator: BigInt(
                                SalePriceToGetTotalRoyalityPercentage,
                            ),
                            denominator: BigInt(d.royalty),
                            destination: Address.parseFriendly(
                                d.royaltyReceiver,
                            ).address,
                        },
                        transactionHash: d.transactionHash,
                        newContent: beginCell()
                            .storeInt(0x01, 8)
                            .storeStringRefTail(d.metadata)
                            .endCell(),
                    },
                } satisfies TonClaimData;
                return data as any;
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
                nonce?: string;
                nftType: 'singular' | 'multiple';
            },
        ],
    ) {
        for (const tx of args) {
            let wallet: any;
            if (tx.toChain.config.chain === 'TON') {
                const tonweb = new TonWeb(
                    new TonWeb.HttpProvider(configs.ton.rpcURL),
                );

                const walletClass = tonweb.wallet.all['v4R2'];

                wallet = new walletClass(tonweb.provider, {
                    publicKey: TonWeb.utils.hexToBytes(
                        genWallets.tonWallet.publicKey,
                    ),
                });
            }
            const from = await tx.fromChain.bridge.lock721({
                address:
                    tx.toChain.config.chain === 'TON'
                        ? (await wallet.getAddress()).toString()
                        : tx.toChain.address,
                destinationChain: tx.toChain.config.chain as SupportedChains,
                sourceNftContractAddress: tx.contractAddress,
                tokenId: tx.tokenId,
                nonce: tx.nonce!,
                collectionCodeInfo: tx.codeInfo!,
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
                log: log!,
            })!;

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

            let claimed = false;
            while (!claimed)
                try {
                    const claimTx = await tx.toChain.bridge.claimNFT721(
                        tx.toChain.cdMapper(
                            nftTransferDetailsObject,
                        ) as unknown as any,
                        signatureArray,
                    );
                    await claimTx.wait();
                    console.log(
                        `Claimed on ${tx.toChain.config.chain} at ${claimTx.hash}`,
                    );
                    claimed = true;
                    return claimTx.hash;
                } catch (e) {
                    console.log(e);
                    console.log(`Retrying Claiming`);
                }
        }
        return '';
    }

    await transfer([
        {
            fromChain: data.bsc,
            toChain: data.ton,
            contractAddress: await contract!.getAddress(),
            tokenId: '1',
            nftType: 'singular',
        },
    ]);
})().catch((e) => {
    console.error(e);
});

async function createNftOnEvm(signer: Wallet) {
    const contract = await new ERC721Royalty__factory(signer).deploy(
        'TestContract',
        'TC',
        signer.address,
    );
    await contract.deploymentTransaction()?.wait();
    return contract;
}
