import { expect } from 'chai';
import sinon from 'sinon';
import * as validatorUtils from '@src/modules/validator/utils';
import { evmLockListener } from '@src/modules/validator/components/nftLockListener/components';
import * as evmLockListenerUtils from '@src/modules/validator/components/nftLockListener/components/evmLockListener/utils';
import { mockBridgeConfig, mockWallets } from '@src/test/mockData';
import { IEvmChainConfig } from '@src/types';
import { LogEntry } from '@src/modules/validator/utils/evmContractListener/types';

describe('evmLockListener', () => {


    afterEach(() => {
        sinon.restore();
    });

    it('should call evmContractListener with the correct arguments', async () => {
        const config = mockBridgeConfig;
        const evmChainConfig = mockBridgeConfig.bridgeChains[1] as IEvmChainConfig;
        const wallets = mockWallets
        const handleLogFunctionMock = async ({ log }: { log: LogEntry; }) => { console.info(log) };
        const evmContractListenerStub = sinon.stub(validatorUtils, 'evmContractListener').resolves();
        sinon.stub(evmLockListenerUtils, 'getEvmLockListenerHandler').returns(handleLogFunctionMock)

        await evmLockListener({ config, evmChainConfig, wallets });

        // Assertions
        expect(evmContractListenerStub.calledOnce).to.be.true;
        expect(evmContractListenerStub.args[0][0]).to.deep.equal({
            contractAddress: evmChainConfig.contractAddress,
            rpcURL: evmChainConfig.rpcURL,
            lastBlock_: evmChainConfig.lastBlock,
            chain: evmChainConfig.chain,
            handleLog: handleLogFunctionMock,
        });
    });


});
