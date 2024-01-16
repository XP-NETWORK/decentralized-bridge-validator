import { expect } from 'chai';
import sinon from 'sinon';
import { isStakingCoinFunded } from '@src/modules/setup/components/getInitialFunds/components/promptToGetFunding/components';
import * as utils from '@src/utils/functions';
import { mockBridgeConfig, mockWallets } from '@src/test/mockData';

describe('isStakingCoinFunded', () => {
    const testCases = [
        {
            description: 'should return true if the staking coin is funded',
            stakingChainConfig_: {
                intialFund: '10',
            },
            balance: BigInt('11'), // Balance greater than initial fund
            expected: true,
        },
        {
            description:
                'should return false if the staking coin is not funded',
            stakingChainConfig_: {
                intialFund: '10',
            },
            balance: BigInt('9'), // Balance less than initial fund
            expected: false,
        },
        {
            description: 'should throw an error on exception',
            stakingChainConfig_: {
                intialFund: '10',
            },
            balance: BigInt('5'), // Any balancea
            throwError: true,
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
            description,
            stakingChainConfig_,
            balance,
            expected,
            throwError,
        }) => {
            it(description, async () => {
                const { evmWallet } = mockWallets;
                const stakingChainConfig = {
                    ...mockBridgeConfig.stakingConfig,
                    ...stakingChainConfig_,
                };
                if (throwError) {
                    // Stub getCurrentEvmBalance to throw an error
                    sinon
                        .stub(utils, 'getCurrentEvmBalance')
                        .rejects(new Error('Balance fetch failed'));
                } else {
                    // Stub getCurrentEvmBalance to return a balance
                    sinon.stub(utils, 'getCurrentEvmBalance').resolves(balance);
                }

                try {
                    const result = await isStakingCoinFunded({
                        stakingChainConfig,
                        evmWallet,
                    });
                    expect(result).to.equal(expected);
                } catch (error) {
                    if (!throwError) {
                        // Ensure the function doesn't throw an error when not expected
                        throw error;
                    }
                    expect(error).to.equal(
                        'Error while isStakingCoinFunded, orignal error: Error: Balance fetch failed',
                    );
                }
            });
        },
    );
});
