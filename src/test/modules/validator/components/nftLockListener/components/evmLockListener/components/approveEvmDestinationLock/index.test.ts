import { expect } from 'chai';
import sinon from 'sinon';
import * as utils from "@src/utils/functions";
import { mockBridgeConfig, mockWallets } from '@src/test/mockData';
import { approveEvmDestinationLock } from '@src/modules/validator/components/nftLockListener/components/evmLockListener/components';

describe('approveEvmDestinationLock', () => {

    const nftTransferDetailsObject = {
        tokenId: "1",
        sourceChain: "BSC",
        destinationChain: "ETH",
        destinationUserAddress: "0x0000000000000000000000000000000000000000",
        sourceNftContractAddress: "0x0000000000000000000000000000000000000000",
        name: "nameMock",
        symbol: "symbolMock",
        royalty: "500",
        royaltyReceiver: "0x0000000000000000000000000000000000000000",
        metadata: "metadataMock",
        transactionHash: "transactionHashMock",
        tokenAmount: "1",
        nftType: "nftTypeMock",
        fee: "500",
    }

    const { evmWallet } = mockWallets;
    const { storageConfig } = mockBridgeConfig

    const testCases = [
        {
            approveLockNft: sinon.stub().resolves({
                wait: sinon.stub().resolves(),
                hash: "some unique hash"
            }),
            expectedToThrow: false,
            description: "should approveEvmDestinationLock if no errors"
        },
        {
            approveLockNft: sinon.stub().rejects({ shortMessage: `execution reverted: "Signature already used"` }),
            expectedToThrow: false,
            description: "should not throw approveEvmDestinationLock if already approved"
        },
        {
            approveLockNft: sinon.stub().rejects("Some other error"),
            expectedToThrow: true,
            description: "should throw error if error is not 'Signature already used'"
        },

    ];

    afterEach(() => {
        sinon.restore();
    });
    beforeEach(() => {
        console.info = () => { };
    });


    testCases.forEach(({ approveLockNft, expectedToThrow, description }) => {

        it(description, async () => {
            const txChain = "BSC"
            const storageContractStub = {
                approveLockNft
            };
            const getStorageContractStub = sinon.stub(utils, 'getStorageContract');
            getStorageContractStub.returns({ ...getStorageContractStub[1], ...storageContractStub });
            const storageContract = getStorageContractStub({ evmChainConfig: storageConfig, evmWallet });
            if (expectedToThrow) {
                try {
                    await approveEvmDestinationLock({ nftTransferDetailsObject, evmWallet, storageContract, txChain })
                } catch (error) {
                    expect(error).to.exist;
                    expect(error.message).to.equal("Error while processing log");
                }
            } else
                await approveEvmDestinationLock({ nftTransferDetailsObject, evmWallet, storageContract, txChain });

        });
    });
});
