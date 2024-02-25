import {
    AbiRegistry,
    Account,
    Address,
    AddressType,
    AddressValue,
    BigUIntType,
    BigUIntValue,
    BytesType,
    BytesValue,
    Field,
    FieldDefinition,
    ResultsParser,
    SmartContract,
    Struct,
    StructType,
    Transaction,
    TransactionPayload,
    VariadicValue,
} from '@multiversx/sdk-core';
import { multiversXBridgeABI } from '@src/abi';
import { IBridge, IMultiversXChainConfigAndMultiversXWallet } from '@src/types';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { UserSigner } from '@multiversx/sdk-wallet/out';
import { ProcessDelayMilliseconds } from '../constants/processDelayMilliseconds';
import waitForMSWithMsg from './waitForMSWithMsg';
import { SupportedChains } from '@src/config/chainSpecs';
import { Nonce } from '@multiversx/sdk-network-providers/out/primitives';

export type MultiversXLockArgs = {
    sourceNftContractAddress: string;
    nonce: string;
    destinationChain: SupportedChains;
    address: string;
    tokenId: string;
};
export type ClaimStruct = {
    tokenId: string;
    sourceChain: string;
    destinationChain: string;
    destinationUserAddress: string;
    sourceNftContractAddress: string;
    name: string;
    symbol: string;
    royalty: string;
    royaltyReceiver: string;
    attrs: string;
    transactionHash: string;
    tokenAmount: string;
    nftType: string;
    fee: string;
    metadata: string;
};

const getMultiversXBridgeContract = ({
    multiversXChainConfig,
    multiversXWallet,
}: IMultiversXChainConfigAndMultiversXWallet): IBridge<
    MultiversXLockArgs,
    ClaimStruct
> => {
    const abiRegistry = AbiRegistry.create(multiversXBridgeABI);

    const proxyNetworkProvider = new ProxyNetworkProvider(
        multiversXChainConfig.gatewayURL,
    );

    const multiversXBridgeAddress = Address.fromBech32(
        multiversXChainConfig.contractAddress,
    );
    const multiversXBridgeContract = new SmartContract({
        address: multiversXBridgeAddress,
        abi: abiRegistry,
    });

    return {
        lock721: async ({
            address,
            destinationChain,
            nonce,
            sourceNftContractAddress,
            tokenId,
        }) => {
            const ba = new Address(multiversXChainConfig.contractAddress);
            try {
                const signer = UserSigner.fromWallet(
                    multiversXWallet.userWallet,
                    multiversXWallet.password,
                );

                const userAddress = new Address(
                    multiversXWallet.userWallet.bech32,
                );
                const userAccount = new Account(userAddress);
                const userOnNetwork =
                    await proxyNetworkProvider.getAccount(userAddress);
                userAccount.update(userOnNetwork);

                const collectionIdentifiers =
                    '@' + Buffer.from(sourceNftContractAddress).toString('hex');
                const noncec = '@' + nonce;
                const quantity = '@' + '01';
                const destination_address = '@' + ba.hex();
                const method = '@' + Buffer.from('lock721').toString('hex');
                const token_id = '@' + Buffer.from(tokenId).toString('hex');
                const destination_chain =
                    '@' + Buffer.from(destinationChain).toString('hex');
                const destination_user_address =
                    '@' + Buffer.from(address).toString('hex');
                const source_nft_contract_address = collectionIdentifiers;

                const tx3 = new Transaction({
                    data: new TransactionPayload(
                        'ESDTNFTTransfer' +
                            collectionIdentifiers +
                            noncec +
                            quantity +
                            destination_address +
                            method +
                            token_id +
                            destination_chain +
                            destination_user_address +
                            source_nft_contract_address +
                            noncec,
                    ),
                    gasLimit: 600000000,
                    sender: signer.getAddress(),
                    receiver: signer.getAddress(),
                    chainID: 'D',
                });

                tx3.setNonce(userAccount.getNonceThenIncrement());

                const serializedTransaction = tx3.serializeForSigning();
                const transactionSignature = await signer.sign(
                    serializedTransaction,
                );
                tx3.applySignature(transactionSignature);

                const txHash = await proxyNetworkProvider.sendTransaction(tx3);
                return {
                    hash: txHash,
                    wait: () => Promise.resolve(txHash),
                };
            } catch (e) {
                console.log(e);
                throw new Error('Error locking in multiversX bridge');
            }
        },
        claimNFT721: async (nftTransferDetailsObject, sigs) => {
            const signer = UserSigner.fromWallet(
                multiversXWallet.userWallet,
                multiversXWallet.password,
            );

            const userAddress = new Address(multiversXWallet.userWallet.bech32);
            const userAccount = new Account(userAddress);
            const userOnNetwork =
                await proxyNetworkProvider.getAccount(userAddress);
            userAccount.update(userOnNetwork);

            const structClaimData = new StructType('ClaimData', [
                new FieldDefinition(
                    'token_id',
                    'name of the nft',
                    new BytesType(),
                ),
                new FieldDefinition(
                    'source_chain',
                    'attributes of the nft',
                    new BytesType(),
                ),
                new FieldDefinition(
                    'destination_chain',
                    'attributes of the nft',
                    new BytesType(),
                ),
                new FieldDefinition(
                    'destination_user_address',
                    'attributes of the nft',
                    new AddressType(),
                ),
                new FieldDefinition(
                    'source_nft_contract_address',
                    'attributes of the nft',
                    new BytesType(),
                ),
                new FieldDefinition(
                    'name',
                    'attributes of the nft',
                    new BytesType(),
                ),
                new FieldDefinition(
                    'symbol',
                    'attributes of the nft',
                    new BytesType(),
                ),
                new FieldDefinition(
                    'royalty',
                    'attributes of the nft',
                    new BigUIntType(),
                ),
                new FieldDefinition(
                    'royalty_receiver',
                    'attributes of the nft',
                    new AddressType(),
                ),
                new FieldDefinition(
                    'attrs',
                    'attributes of the nft',
                    new BytesType(),
                ),
                new FieldDefinition(
                    'transaction_hash',
                    'attributes of the nft',
                    new BytesType(),
                ),
                new FieldDefinition(
                    'token_amount',
                    'attributes of the nft',
                    new BigUIntType(),
                ),
                new FieldDefinition(
                    'nft_type',
                    'attributes of the nft',
                    new BytesType(),
                ),
                new FieldDefinition(
                    'fee',
                    'attributes of the nft',
                    new BigUIntType(),
                ),
            ]);

            // const structSigInfo = new StructType('SignatureInfo', [
            //     new FieldDefinition(
            //         'public_key',
            //         'attributes of the nft',
            //         new AddressType(),
            //     ),
            //     new FieldDefinition(
            //         'sig',
            //         'attributes of the nft',
            //         new BytesType(),
            //     ),
            // ]);
            const claimDataArgs = new Struct(structClaimData, [
                new Field(
                    new BytesValue(
                        Buffer.from(
                            new Nonce(
                                Number(nftTransferDetailsObject.tokenId),
                            ).hex(),
                            'hex',
                        ),
                    ),
                    'token_id',
                ),
                new Field(
                    new BytesValue(
                        Buffer.from(nftTransferDetailsObject.sourceChain),
                    ),
                    'source_chain',
                ),
                new Field(
                    new BytesValue(
                        Buffer.from(nftTransferDetailsObject.destinationChain),
                    ),
                    'destination_chain',
                ),
                new Field(
                    new AddressValue(
                        new Address(
                            nftTransferDetailsObject.destinationUserAddress,
                        ),
                    ),
                    'destination_user_address',
                ),
                new Field(
                    new BytesValue(
                        Buffer.from(
                            nftTransferDetailsObject.sourceNftContractAddress,
                        ),
                    ),
                    'source_nft_contract_address',
                ),
                new Field(
                    new BytesValue(Buffer.from(nftTransferDetailsObject.name)),
                    'name',
                ),
                new Field(
                    new BytesValue(
                        Buffer.from(
                            'N' +
                                nftTransferDetailsObject.sourceChain.toUpperCase(),
                        ),
                    ),
                    'symbol',
                ),
                new Field(
                    new BigUIntValue(Number(nftTransferDetailsObject.royalty)),
                    'royalty',
                ),
                new Field(
                    new AddressValue(
                        new Address(nftTransferDetailsObject.royaltyReceiver),
                    ),
                    'royalty_receiver',
                ),
                new Field(
                    new BytesValue(
                        Buffer.from(nftTransferDetailsObject.metadata),
                    ),
                    'attrs',
                ),
                new Field(
                    new BytesValue(
                        Buffer.from(nftTransferDetailsObject.transactionHash),
                    ),
                    'transaction_hash',
                ),
                new Field(
                    new BigUIntValue(nftTransferDetailsObject.tokenAmount),
                    'token_amount',
                ),
                new Field(
                    new BytesValue(
                        Buffer.from(nftTransferDetailsObject.nftType),
                    ),
                    'nft_type',
                ),
                new Field(
                    new BigUIntValue(nftTransferDetailsObject.fee),
                    'fee',
                ),
            ]);
            const data = [
                claimDataArgs,

                sigs.map((item) => {
                    return {
                        public_key: new AddressValue(
                            new Address(Buffer.from(item.signer, 'hex')),
                        ),
                        sig: new BytesValue(
                            Buffer.from(
                                item.signature.replace('0x', ''),
                                'hex',
                            ),
                        ),
                    };
                }),

                VariadicValue.fromItems(
                    new BytesValue(
                        Buffer.from(nftTransferDetailsObject.metadata, 'utf-8'),
                    ),
                    new BytesValue(
                        Buffer.from(nftTransferDetailsObject.metadata, 'utf-8'),
                    ),
                ),
            ];
            const transaction = multiversXBridgeContract.methods
                .claimNft721(data)
                .withSender(signer.getAddress())
                .withChainID('D')
                .withGasLimit(6_000_000_00)
                .withValue(new BigUIntValue('50000000000000000'))
                .buildTransaction();
            transaction.setNonce(userAccount.getNonceThenIncrement());
            transaction.applySignature(
                await signer.sign(transaction.serializeForSigning()),
            );
            const hash =
                await proxyNetworkProvider.sendTransaction(transaction);
            return {
                hash: hash,
                wait: () => Promise.resolve(hash as unknown),
            };
        },
        validators: async (validatorAddress: string) => {
            const query = multiversXBridgeContract.createQuery({
                func: 'validators',
                args: [new BytesValue(Buffer.from(validatorAddress, 'hex'))],
            });
            const queryResponse =
                await proxyNetworkProvider.queryContract(query);
            const validatorsDefinition =
                multiversXBridgeContract.getEndpoint('validators');
            const resultsParser = new ResultsParser();
            const { firstValue } = resultsParser.parseQueryResponse(
                queryResponse,
                validatorsDefinition,
            );
            let added = false;
            if (firstValue) ({ added } = firstValue.valueOf()[0]);
            return { added };
        },
        validatorsCount: async () => {
            const query = multiversXBridgeContract.createQuery({
                func: 'validatorsCount',
            });
            const queryResponse =
                await proxyNetworkProvider.queryContract(query);
            const validatorsCountDefinition =
                multiversXBridgeContract.getEndpoint('validatorsCount');

            const { firstValue } = new ResultsParser().parseQueryResponse(
                queryResponse,
                validatorsCountDefinition,
            );
            const count = firstValue!.valueOf();
            return count;
        },
        addValidator: async (
            validatorAddress: string,
            signatures: {
                signerAddress: string;
                signature: string;
            }[],
        ) => {
            try {
                const signer = UserSigner.fromWallet(
                    multiversXWallet.userWallet,
                    multiversXWallet.password,
                );

                const userAddress = new Address(
                    multiversXWallet.userWallet.bech32,
                );
                const userAccount = new Account(userAddress);
                const userOnNetwork =
                    await proxyNetworkProvider.getAccount(userAddress);
                userAccount.update(userOnNetwork);

                const data = [
                    new AddressValue(
                        new Address(Buffer.from(validatorAddress, 'hex')),
                    ),
                    signatures.map((item) => {
                        return {
                            sig: new BytesValue(
                                Buffer.from(
                                    item.signature.replace('0x', ''),
                                    'hex',
                                ),
                            ),
                            public_key: new AddressValue(
                                new Address(
                                    Buffer.from(item.signerAddress, 'hex'),
                                ),
                            ),
                        };
                    }),
                ];

                const transaction = multiversXBridgeContract.methods
                    .addValidator(data)
                    .withSender(signer.getAddress())
                    .withChainID(multiversXChainConfig.chainID)
                    .withNonce(userAccount.nonce)
                    .withGasLimit(6_000_000_00)
                    .buildTransaction();
                transaction.applySignature(
                    await signer.sign(transaction.serializeForSigning()),
                );
                const hash =
                    await proxyNetworkProvider.sendTransaction(transaction);

                return {
                    hash,
                    wait: async () => {
                        const isTransactionCompleted = async () => {
                            try {
                                return (
                                    await proxyNetworkProvider.getTransaction(
                                        hash,
                                        true,
                                    )
                                ).isCompleted;
                            } catch (error) {
                                return false;
                            }
                        };

                        while (!(await isTransactionCompleted())) {
                            await waitForMSWithMsg(
                                ProcessDelayMilliseconds,
                                'Waiting for MultiversX transaction to finish',
                            );
                        }

                        const transactionReceipt =
                            await proxyNetworkProvider.getTransaction(
                                hash,
                                true,
                            );
                        if (transactionReceipt.status.isFailed()) {
                            console.log({ hash });
                            throw new Error('Transaction failed');
                        } else {
                            return transactionReceipt;
                        }
                    },
                };
            } catch (e) {
                console.log(e);
                throw new Error('Error adding validator in multiversX bridge');
            }
        },
    };
};

export default getMultiversXBridgeContract;
