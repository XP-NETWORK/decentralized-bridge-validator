import { expect } from 'chai';
import sinon from 'sinon';
import * as utils from '@src/utils/functions';
import * as prompts from '@src/modules/setup/components/getInitialFunds/components';
import { mockBridgeConfig, mockWallets } from '@src/test/mockData';
import { getInitialFunds } from '@src/modules/setup/components';

describe('getInitialFunds', () => {
    const testCases = [
        {
            description: 'should run the loop until funds are obtained',
            promptResults: [false, false, true], // Simulate promptToGetFunding returning false, false, and then true
        },
        {
            description:
                'should run the loop once if funds are obtained immediately',
            promptResults: [true], // Simulate promptToGetFunding returning true immediately
        },
        {
            description:
                'should handle errors and retry if funds are not obtained',
            promptResults: [false, false, false, true], // Simulate promptToGetFunding returning false multiple times and then true
        },
    ];

    afterEach(() => {
        sinon.restore();
    });
    beforeEach(() => {
        console.info = () => {};
    });

    testCases.forEach(({ description, promptResults }) => {
        it(description, async () => {
            const config = mockBridgeConfig;
            const wallets = mockWallets;

            // Stub the functions used in getInitialFunds
            sinon.stub(utils, 'waitForMSWithMsg').resolves(); // Stub waitForMSWithMsg
            sinon.stub(utils, 'waitForKeyPress').resolves(); // Stub waitForKeyPress

            const promptToGetFundingStub = sinon.stub();
            promptResults.forEach((result, index) => {
                promptToGetFundingStub.onCall(index).resolves(result);
            });

            sinon
                .stub(prompts, 'promptToGetFunding')
                .callsFake(promptToGetFundingStub);

            await getInitialFunds({ config, wallets });

            // Check if promptToGetFunding was called the expected number of times
            expect(promptToGetFundingStub.callCount).to.equal(
                promptResults.length,
            );
        });
    });
});
