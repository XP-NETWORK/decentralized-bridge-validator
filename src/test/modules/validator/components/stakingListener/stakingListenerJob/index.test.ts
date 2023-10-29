import { expect } from 'chai';
import * as validatorUtils from '@src/modules/validator/utils';
import sinon from 'sinon';
import stakingListenerJob from '@src/modules/validator/components/stakingListener/stakingListenerJob';
import { mockBridgeConfig, mockWallets } from '@src/test/mockData';
import { LogEntry } from '@src/modules/validator/utils/evmContractListener/types';
import * as stakingUtils from '@src/modules/validator/components/stakingListener/utils';

describe('stakingListenerJob', () => {
    it('should call evmContractListener with the correct arguments', async () => {

        const evmContractListenerStub = sinon.stub(validatorUtils, "evmContractListener").resolves();


        const handleLogFunctionMock = async ({ log }: { log: LogEntry; }) => { console.info(log) };
        const getStakingListenerLogHandlerStub = sinon.stub(stakingUtils, 'getStakingListenerLogHandler').returns(handleLogFunctionMock);

        await stakingListenerJob({ config: mockBridgeConfig, wallets: mockWallets });
        
        const { contractAddress, rpcURL, lastBlock, chain } = mockBridgeConfig.stakingConfig;
        const handleLog = getStakingListenerLogHandlerStub({ config: mockBridgeConfig, wallets: mockWallets })

        expect(evmContractListenerStub.calledWithExactly({
            contractAddress,
            rpcURL,
            lastBlock_: lastBlock,
            chain,
            handleLog,
        })).to.be.true


        sinon.restore();
    });
})