import { expect } from 'chai';
import { nftLockListener } from '@src/modules/validator/components';
import { evmLockListener } from '@src/modules/validator/components/nftLockListener/components';
import * as validatorUtils from '@src/modules/validator/utils';
import { mockBridgeConfig, mockWallets } from '@src/test/mockData';
import sinon from 'sinon';

describe('nftLockListener', () => {


    it('should create and enqueue jobs for EVM chains', async () => {

        const createJobWithWorkerStub = sinon.stub(validatorUtils, 'createJobWithWorker').resolves();

        await nftLockListener({ config: mockBridgeConfig, wallets: mockWallets });

        // Assert that createJobWithWorker was called for each EVM chain
        mockBridgeConfig.bridgeChains.forEach((chainConfig) => {
            if (chainConfig.chainType === 'evm') {
                const expectedJobData = {
                    evmChainConfig: chainConfig,
                    config: mockBridgeConfig,
                    wallets: mockWallets,
                };
                const expectedJobName = `evmLockedEventListener_${chainConfig.chain}`;
                const expectedJobFunction = evmLockListener
                expect(createJobWithWorkerStub.calledWithExactly({
                    jobData: expectedJobData,
                    jobName: expectedJobName,
                    jobFunction: expectedJobFunction,
                })).to.be.true
            }
        });

        sinon.restore();
    });
});
