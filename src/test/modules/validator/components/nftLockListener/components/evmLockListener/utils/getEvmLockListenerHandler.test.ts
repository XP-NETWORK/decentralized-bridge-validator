import sinon from 'sinon';
import * as utils from '@src/utils/functions';
import * as lockEventComponents from '@src/modules/validator/components/nftLockListener/components';
import { expect } from 'chai';
import * as evmLockEventUtils from '@src/modules/validator/components/nftLockListener/components/evmLockListener/utils';
import * as lockEventUtils from '@src/modules/validator/components/nftLockListener/utils';
import { mockBridgeConfig, mockWallets } from '@src/test/mockData';
import { IEvmChainConfig } from '@src/types';

describe('getEvmLockListenerHandler', () => {
    beforeEach(() => {
        console.info = () => {};
    });

    afterEach(() => {
        sinon.restore();
    });

    const testCases = [
        {
            description:
                'should approve locking of nft if destination chain is correct',
            approveLockCalled: true,
            chainFeeStubCalled: true,
            decodedLogs: {
                tokenId: '1', // Unique ID for the NFT transfer
                destinationChain: 'ETH', // Chain to where the NFT is being transferred
                destinationUserAddress: '', // User's address in the destination chain
                sourceNftContractAddress:
                    '0x0000000000000000000000000000000000000000', // Address of the NFT contract in the source chain
                tokenAmount: '1', // amount of nfts to be transfered ( 1 in 721 case )
                nftType: 'single', // Sigular or multiple ( 721 / 1155)
                sourceChain: 'BSC', // Source chain of NFT
            },
            nftDetails: {
                royalty: '500',
                royaltyReceiver: '0x0000000000000000000000000000000000000000',
                name: 'Dummy NFT',
                symbol: 'DUM',
                metadata: 'uri/1',
            },
        },
        {
            description:
                'should return early if destination chain is incorrect',
            approveLockCalled: false,
            chainFeeStubCalled: false,
            decodedLogs: {
                tokenId: '1', // Unique ID for the NFT transfer
                destinationChain: 'SOME_NON_EXISTANT_CHAIN', // Chain to where the NFT is being transferred
                destinationUserAddress: '', // User's address in the destination chain
                sourceNftContractAddress:
                    '0x0000000000000000000000000000000000000000', // Address of the NFT contract in the source chain
                tokenAmount: '1', // amount of nfts to be transfered ( 1 in 721 case )
                nftType: 'single', // Sigular or multiple ( 721 / 1155)
                sourceChain: 'BSC', // Source chain of NFT
            },
            nftDetails: {
                royalty: '500',
                royaltyReceiver: '0x0000000000000000000000000000000000000000',
                name: 'Dummy NFT',
                symbol: 'DUM',
                metadata: 'uri/1',
            },
        },
        {
            description:
                'should not call approveLock of nft if destination chain is non-evm',
            approveLockCalled: false,
            chainFeeStubCalled: true,
            decodedLogs: {
                tokenId: '1', // Unique ID for the NFT transfer
                destinationChain: 'nonEvmChainMock', // Chain to where the NFT is being transferred
                destinationUserAddress: '', // User's address in the destination chain
                sourceNftContractAddress:
                    '0x0000000000000000000000000000000000000000', // Address of the NFT contract in the source chain
                tokenAmount: '1', // amount of nfts to be transfered ( 1 in 721 case )
                nftType: 'single', // Sigular or multiple ( 721 / 1155)
                sourceChain: 'BSC', // Source chain of NFT
            },
            nftDetails: {
                royalty: '500',
                royaltyReceiver: '0x0000000000000000000000000000000000000000',
                name: 'Dummy NFT',
                symbol: 'DUM',
                metadata: 'uri/1',
            },
        },
    ];

    testCases.forEach(
        ({
            description,
            approveLockCalled,
            chainFeeStubCalled,
            decodedLogs,
            nftDetails,
        }) => {
            it(description, async () => {
                const chainFeeStub = sinon.stub().resolves(BigInt(100));
                const storageContractStub = {
                    chainFee: chainFeeStub,
                };

                const getStorageContractStub = sinon.stub(
                    utils,
                    'getStorageContract',
                );
                getStorageContractStub.returns({
                    ...getStorageContractStub[1],
                    ...storageContractStub,
                });

                const approveLockStub = sinon
                    .stub(lockEventComponents, 'approveLock')
                    .resolves();
                sinon
                    .stub(evmLockEventUtils, 'getLockEventDecodedLog')
                    .returns(decodedLogs);
                sinon
                    .stub(lockEventUtils, 'getNftDetails')
                    .resolves(nftDetails);

                const handleLog = evmLockEventUtils.getEvmLockListenerHandler({
                    config: mockBridgeConfig,
                    evmChainConfig: mockBridgeConfig
                        .bridgeChains[1] as IEvmChainConfig,
                    wallets: mockWallets,
                });

                await handleLog({
                    log: {
                        address: '0x5ab1fbd625cc8e343d08b0cdac9ee88e7f8f9022',
                        topics: [
                            '0xecb797147b1fe2e559c12a8239cb04eee1f842ccc98a5b136ebd7c983ffd4854',
                        ],
                        data: '0x',
                        blockNumber: BigInt('4545299'),
                        transactionHash:
                            '0xe5b4bdec1c246501953bac722a748ab8ca42fdb7b000b725664561987e7e75db',
                        transactionIndex: BigInt('2'),
                        blockHash:
                            '0x9342d7544aa0e973fcac8fcadf6e1acf2709020a0d8f4e7666b63b71b84e059f',
                        logIndex: BigInt('2'),
                        removed: false,
                    },
                });
                expect(chainFeeStub.calledOnce).to.be.equals(
                    chainFeeStubCalled,
                );
                expect(approveLockStub.calledOnce).to.be.equals(
                    approveLockCalled,
                );
            });
        },
    );
});
