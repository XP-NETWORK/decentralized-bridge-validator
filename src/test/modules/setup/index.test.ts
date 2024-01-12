import { expect } from 'chai';
import sinon from 'sinon';
import * as setupComponents from '@src/modules/setup/components';
import * as utilsFunctions from '@src/utils/functions';
import * as dataSource from '@src/db/data-source';
import * as validatorFunction from '@src/modules/validator';
import { setup } from '@src/modules/setup';

describe('stakeTokens', () => {
    before(() => {});
    afterEach(() => {
        sinon.restore();
    });

    const testCases = [
        {
            description:
                'should not call getInitialFunds & stakeTokens if already staked',
            isStaked: true,
            getInitialFundCalled: false,
            stakeTokensCalled: false,
            processArgv: [],
        },
        {
            description:
                'should call getInitialFunds & stakeTokens if not already staked',
            isStaked: false,
            getInitialFundCalled: true,
            stakeTokensCalled: true,
            processArgv: [],
        },
        {
            description:
                'should run for testnet if --testnet args are provided',
            isStaked: false,
            getInitialFundCalled: true,
            stakeTokensCalled: true,
            processArgv: ['--testnet'],
        },
    ];

    testCases.forEach(
        ({
            description,
            isStaked,
            getInitialFundCalled,
            stakeTokensCalled,
            processArgv,
        }) => {
            it(description, async () => {
                const consoleInfoStub = sinon.stub(console, 'info');

                const AppDataSourceStub = sinon
                    .stub(dataSource.AppDataSource, 'initialize')
                    .resolves();
                const isStakedStub = sinon
                    .stub(setupComponents, 'isStaked')
                    .resolves(isStaked);
                const getInitialFundsStub = sinon
                    .stub(setupComponents, 'getInitialFunds')
                    .resolves();
                const stakeTokensStub = sinon
                    .stub(setupComponents, 'stakeTokens')
                    .resolves();
                const addSelfInBridgesStub = sinon
                    .stub(setupComponents, 'addSelfInBridges')
                    .resolves();
                const runValidatorsStub = sinon
                    .stub(validatorFunction, 'runValidators')
                    .resolves();

                let getRedisConnectionStub = sinon.stub(
                    utilsFunctions,
                    'getRedisConnection',
                );
                getRedisConnectionStub = getRedisConnectionStub.returns({
                    ...getRedisConnectionStub[1],
                    flushall: sinon.stub().resolves(),
                });

                process.argv = processArgv;
                await setup();

                expect(AppDataSourceStub.calledOnce).to.be.true;
                expect(getRedisConnectionStub.calledOnce).to.be.true;
                expect(isStakedStub.calledOnce).to.be.true;

                expect(getInitialFundsStub.calledOnce).to.equal(
                    getInitialFundCalled,
                );
                expect(stakeTokensStub.calledOnce).to.equal(stakeTokensCalled);

                expect(addSelfInBridgesStub.calledOnce).to.be.true;
                expect(runValidatorsStub.calledOnce).to.be.true;
                expect(consoleInfoStub.calledWith('TESTNET_INITIATED')).equals(
                    processArgv.length > 0,
                );
            });
        },
    );
});
