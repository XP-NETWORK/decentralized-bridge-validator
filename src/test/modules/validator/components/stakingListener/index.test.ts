import { expect } from 'chai';
import * as validatorUtils from '@src/modules/validator/utils';
import { mockBridgeConfig, mockWallets } from '@src/test/mockData';
import sinon from 'sinon';
import stakingListenerJob from '@src/modules/validator/components/stakingListener/stakingListenerJob';
import { stakingListener } from '@src/modules/validator/components';

describe('stakingListener', () => {
    it('should create and enqueue jobs for stakingListener', async () => {
        const createJobWithWorkerStub = sinon
            .stub(validatorUtils, 'createJobWithWorker')
            .resolves();
        const expectedJobData = {
            config: mockBridgeConfig,
            wallets: mockWallets,
        };
        await stakingListener(expectedJobData);

        const expectedJobName = `stakingApprover`;
        const expectedJobFunction = stakingListenerJob;
        expect(
            createJobWithWorkerStub.calledWithExactly({
                jobData: expectedJobData,
                jobName: expectedJobName,
                jobFunction: expectedJobFunction,
            }),
        ).to.be.true;

        sinon.restore();
    });
});
