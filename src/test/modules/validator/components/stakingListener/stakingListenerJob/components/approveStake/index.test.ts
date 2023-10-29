import { expect } from 'chai';
import sinon from 'sinon';
import * as utils from "@src/utils/functions"
import { mockBridgeConfig, mockWallets } from '@src/test/mockData';
import { approveStake } from '@src/modules/validator/components/stakingListener/stakingListenerJob/components';

describe('approveStake', () => {


    beforeEach(() => {
        console.info = () => { };
    });

    afterEach(() => {
        sinon.restore();
    });
    const testCases = [
        {
            approveStakeStubFunction: sinon.stub().resolves({ hash: "some unique hash" }),
            expectError: false,
            description: "should approve stake"
        },
        {
            approveStakeStubFunction: sinon.stub().rejects({
                shortMessage: `execution reverted: "Signature already used"`
            }),
            expectError: false,
            description: "should not throw error if already approved stake"
        },
        {
            approveStakeStubFunction: sinon.stub().rejects({
                shortMessage: `execution reverted: "Some other error"`
            }),
            expectError: true,
            description: "should throw error if error is not of already approved stake"
        }
    ]

    testCases.forEach(({
        approveStakeStubFunction,
        expectError,
        description }) => {

        it(description, async () => {



            const storageContractStub = {
                approveStake: approveStakeStubFunction
            };


            const getStorageContractStub = sinon.stub(utils, "getStorageContract")
            getStorageContractStub.returns({
                ...getStorageContractStub[1],
                ...storageContractStub
            })

            const storageContract = getStorageContractStub({ evmChainConfig: mockBridgeConfig[0], evmWallet: mockWallets.evmWallet })
            if (expectError) {
                try {
                    await approveStake({ wallets: mockWallets, stakerAddress: "0x0000000000000000000000000000000000000000", storageContract })
                } catch (error) {
                    expect(error).to.exist
                    expect(error.message).to.equals("Error while processing log")
                }
            } else {
                await approveStake({ wallets: mockWallets, stakerAddress: "0x0000000000000000000000000000000000000000", storageContract })

            }

            expect(approveStakeStubFunction.calledOnce).to.be.true;
        });

    })

});
