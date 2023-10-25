import { expect } from 'chai';
import sinon from 'sinon';
import { addSelfInBridges } from '@src/modules/setup/components';
import * as addSelfInBridgesComponents from '@src/modules/setup/components/addSelfInBridges/components';
import { mockBridgeConfig, mockWallets } from '@src/test/mockData';

describe('addSelfInBridges', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should call handleEvmValidatorAddition for each EVM chain', async () => {
      
        const handleEvmValidatorAdditionStub = sinon.stub(addSelfInBridgesComponents, "handleEvmValidatorAddition");
        handleEvmValidatorAdditionStub.resolves();

        await addSelfInBridges({ config: mockBridgeConfig, wallets: mockWallets });

        // Ensure handleEvmValidatorAddition is called twice for EVM chains
        expect(handleEvmValidatorAdditionStub.calledTwice).to.be.true;

        // Ensure it's called with the correct arguments
        expect(
            handleEvmValidatorAdditionStub.calledWithExactly({
                storageChainConfig: mockBridgeConfig.storageConfig,
                evmChainConfig: mockBridgeConfig.bridgeChains[0], // First EVM chain
                evmWallet: mockWallets.evmWallet,
            })
        ).to.be.true;
        expect(
            handleEvmValidatorAdditionStub.calledWithExactly({
                storageChainConfig: mockBridgeConfig.storageConfig,
                evmChainConfig: mockBridgeConfig.bridgeChains[1], // Second EVM chain
                evmWallet: mockWallets.evmWallet,
            })
        ).to.be.true;
    });

});
