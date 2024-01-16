import { expect } from 'chai';
import sinon from 'sinon';
import { addSelfInBridges } from '@src/modules/setup/components';
import * as addSelfInBridgesComponents from '@src/modules/setup/components/addSelfInBridges/components';
import { mockBridgeConfig, mockWallets } from '@src/test/mockData';

describe('addSelfInBridges', () => {
    afterEach(() => {
        sinon.restore();
    });
    beforeEach(() => {
        console.info = () => {};
    });

    it('should call handleValidatorAddition for each  chain', async () => {
        const handleValidatorAdditionStub = sinon.stub(
            addSelfInBridgesComponents,
            'handleValidatorAddition',
        );
        handleValidatorAdditionStub.resolves();

        await addSelfInBridges({
            config: mockBridgeConfig,
            wallets: mockWallets,
        });

        // Ensure handleValidatorAddition is called twice for  chains
        expect(handleValidatorAdditionStub.calledThrice).to.be.true;

        // Ensure it's called with the correct arguments
        expect(
            handleValidatorAdditionStub.calledWithExactly({
                storageChainConfig: mockBridgeConfig.storageConfig,
                chainConfig: mockBridgeConfig.bridgeChains[0], // First EVM chain
                wallets: mockWallets,
            }),
        ).to.be.true;

        expect(
            handleValidatorAdditionStub.calledWithExactly({
                storageChainConfig: mockBridgeConfig.storageConfig,
                chainConfig: mockBridgeConfig.bridgeChains[1], // Second EVM chain
                wallets: mockWallets,
            }),
        ).to.be.true;

        expect(
            handleValidatorAdditionStub.calledWithExactly({
                storageChainConfig: mockBridgeConfig.storageConfig,
                chainConfig: mockBridgeConfig.bridgeChains[2], // Second EVM chain
                wallets: mockWallets,
            }),
        ).to.be.true;
    });
});
