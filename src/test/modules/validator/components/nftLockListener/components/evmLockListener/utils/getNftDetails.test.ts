import { expect } from 'chai';
import sinon from 'sinon';
import * as utils from '@src/utils/functions';
import { mockBridgeConfig, mockWallets } from '@src/test/mockData';
import { getNftDetails } from '@src/modules/validator/components/nftLockListener/utils';

describe('getNftDetails', () => {
    const sourceNftContractAddress = '0xDummySource';
    const { evmWallet } = mockWallets;
    const tokenId = '1';

    const royalty = '500';
    const royaltyReceiver = '0xRoyaltyReceiverAddress';
    const name = 'Dummy NFT name';
    const symbol = 'DUM';
    const metadata = 'uri/1';

    const testCases = [
        {
            description:
                'should get nft details if everything resolves; singular',
            name: sinon.stub().resolves(name),
            symbol: sinon.stub().resolves(symbol),
            royaltyInfo: sinon.stub().resolves([royaltyReceiver, royalty]),
            tokenURI: sinon.stub().resolves(metadata),
            nftType: 'singular',
            expected: {
                royalty,
                royaltyReceiver,
                name,
                symbol,
                metadata,
            },
        },
        {
            description:
                'should get other details if only name is rejected; singular',
            name: sinon.stub().rejects(),
            symbol: sinon.stub().resolves(symbol),
            royaltyInfo: sinon.stub().resolves([royaltyReceiver, royalty]),
            tokenURI: sinon.stub().resolves(metadata),
            nftType: 'singular',
            expected: {
                royalty,
                royaltyReceiver,
                name: '',
                symbol,
                metadata,
            },
        },
        {
            description:
                'should get other details if only symbol is rejected; singular',
            name: sinon.stub().resolves(name),
            symbol: sinon.stub().rejects(),
            royaltyInfo: sinon.stub().resolves([royaltyReceiver, royalty]),
            tokenURI: sinon.stub().resolves(metadata),
            nftType: 'singular',
            expected: {
                royalty,
                royaltyReceiver,
                name,
                symbol: '',
                metadata,
            },
        },
        {
            description:
                'should get other details if only royalty info is rejected; singular',
            name: sinon.stub().resolves(name),
            symbol: sinon.stub().resolves(symbol),
            royaltyInfo: sinon.stub().rejects(),
            tokenURI: sinon.stub().resolves(metadata),
            nftType: 'singular',
            expected: {
                royalty: '0',
                royaltyReceiver: '0x0000000000000000000000000000000000000000',
                name,
                symbol,
                metadata,
            },
        },
        {
            description:
                'should get other details if only meta data is rejected; singular',
            name: sinon.stub().resolves(name),
            symbol: sinon.stub().resolves(symbol),
            royaltyInfo: sinon.stub().resolves([royaltyReceiver, royalty]),
            tokenURI: sinon.stub().rejects(),
            nftType: 'singular',
            expected: {
                royalty,
                royaltyReceiver,
                name,
                symbol,
                metadata: '',
            },
        },
        {
            description:
                'should get empty nft details if everything rejects; singular',
            name: sinon.stub().rejects(),
            symbol: sinon.stub().rejects(),
            royaltyInfo: sinon.stub().rejects(),
            tokenURI: sinon.stub().rejects(),
            nftType: 'singular',
            expected: {
                royalty: '0',
                royaltyReceiver: '0x0000000000000000000000000000000000000000',
                name: '',
                symbol: '',
                metadata: '',
            },
        },

        // Multiple nft testcases
        {
            description:
                'should get nft details if everything resolves; multiple',
            name: sinon.stub().resolves(name),
            symbol: sinon.stub().resolves(symbol),
            royaltyInfo: sinon.stub().resolves([royaltyReceiver, royalty]),
            tokenURI: sinon.stub().resolves(metadata),
            nftType: 'multiple',
            expected: {
                royalty,
                royaltyReceiver,
                name,
                symbol,
                metadata,
            },
        },
        {
            description:
                'should get other details if only name is rejected; multiple',
            name: sinon.stub().rejects(),
            symbol: sinon.stub().resolves(symbol),
            royaltyInfo: sinon.stub().resolves([royaltyReceiver, royalty]),
            tokenURI: sinon.stub().resolves(metadata),
            nftType: 'multiple',
            expected: {
                royalty,
                royaltyReceiver,
                name: '',
                symbol,
                metadata,
            },
        },
        {
            description:
                'should get other details if only symbol is rejected; multiple',
            name: sinon.stub().resolves(name),
            symbol: sinon.stub().rejects(),
            royaltyInfo: sinon.stub().resolves([royaltyReceiver, royalty]),
            tokenURI: sinon.stub().resolves(metadata),
            nftType: 'multiple',
            expected: {
                royalty,
                royaltyReceiver,
                name,
                symbol: '',
                metadata,
            },
        },
        {
            description:
                'should get other details if only royalty info is rejected; multiple',
            name: sinon.stub().resolves(name),
            symbol: sinon.stub().resolves(symbol),
            royaltyInfo: sinon.stub().rejects(),
            tokenURI: sinon.stub().resolves(metadata),
            nftType: 'multiple',
            expected: {
                royalty: '0',
                royaltyReceiver: '0x0000000000000000000000000000000000000000',
                name,
                symbol,
                metadata,
            },
        },
        {
            description:
                'should get other details if only meta data is rejected; multiple',
            name: sinon.stub().resolves(name),
            symbol: sinon.stub().resolves(symbol),
            royaltyInfo: sinon.stub().resolves([royaltyReceiver, royalty]),
            tokenURI: sinon.stub().rejects(),
            nftType: 'multiple',
            expected: {
                royalty,
                royaltyReceiver,
                name,
                symbol,
                metadata: '',
            },
        },
        {
            description:
                'should get empty nft details if everything rejects; multiple',
            name: sinon.stub().rejects(),
            symbol: sinon.stub().rejects(),
            royaltyInfo: sinon.stub().rejects(),
            tokenURI: sinon.stub().rejects(),
            nftType: 'multiple',
            expected: {
                royalty: '0',
                royaltyReceiver: '0x0000000000000000000000000000000000000000',
                name: '',
                symbol: '',
                metadata: '',
            },
        },
    ];

    afterEach(() => {
        sinon.restore();
    });
    beforeEach(() => {
        console.info = () => {};
    });

    testCases.forEach(
        ({
            name,
            symbol,
            royaltyInfo,
            tokenURI,
            nftType,
            expected,
            description,
        }) => {
            it(description, async () => {
                const evmSingleNftContractStub = {
                    name,
                    symbol,
                    royaltyInfo,
                    tokenURI,
                };
                const getEvmSingleNftContract = sinon.stub(
                    utils,
                    'getEvmSingleNftContract',
                );
                getEvmSingleNftContract.returns({
                    ...getEvmSingleNftContract[1],
                    ...evmSingleNftContractStub,
                });

                const evmMultiNftContractStub = {
                    royaltyInfo,
                    uri: tokenURI,
                };
                const getEvmMultiNftContract = sinon.stub(
                    utils,
                    'getEvmMultiNftContract',
                );
                getEvmMultiNftContract.returns({
                    ...getEvmMultiNftContract[1],
                    ...evmMultiNftContractStub,
                });

                const result = await getNftDetails({
                    sourceChain: mockBridgeConfig.bridgeChains[0],
                    sourceNftContractAddress,
                    tokenId,
                    evmWallet,
                    nftType,
                    chainType: 'evm',
                });
                expect(result).to.deep.equal(expected);
            });
        },
    );
});
