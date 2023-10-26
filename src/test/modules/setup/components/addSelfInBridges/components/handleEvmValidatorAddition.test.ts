import { expect } from 'chai';
import sinon from 'sinon';
import {
    handleEvmValidatorAddition,
} from '@src/modules/setup/components/addSelfInBridges/components'; // Import the function to test
import * as promts from "@src/modules/setup/components/getInitialFunds/components/promptToGetFunding/components";
import * as utils from "@src/utils/functions"
import { mockBridgeConfig, mockWallets } from '@src/test/mockData';
describe('handleEvmValidatorAddition', () => {


    beforeEach(() => {
        console.info = () => { };
    });

    afterEach(() => {
        sinon.restore();
    });

    const testCases = [
        {
            description: 'should handle not adding validator if already exists',
            isAlreadyAdded: true,
            totalExistingValidators: 1,
            signatures: [{ signature: "signature" }],
            addValidatorCalled: false
        },
        {
            description: 'should handle adding a validator when not already added; total validator count:11, signature count:11',
            isAlreadyAdded: false,
            totalExistingValidators: 11,
            signatures: new Array(11).fill({ signature: "signature" }),
            addValidatorCalled: true
        },
        {
            description: 'should handle adding a validator when not already added; total validator count:11, signature count:8',
            isAlreadyAdded: false,
            totalExistingValidators: 11,
            signatures: new Array(8).fill({ signature: "signature" }),
            addValidatorCalled: true
        }
    ];

    testCases.forEach(({
        description,
        isAlreadyAdded,
        totalExistingValidators,
        signatures,
        addValidatorCalled
    }) => {
        it(description, async () => {

            const hash = "some unique hash";

            const bridgeContractStub = {
                validators: sinon.stub().resolves(isAlreadyAdded),
                validatorsCount: sinon.stub().resolves(BigInt(totalExistingValidators)),
                addValidator: sinon.stub().resolves({ hash }), // Mock adding validator
            };

            const storageContractStub = {
                getStakingSignaturesCount: sinon.stub().resolves(signatures.length), // Mock signature count
                getStakingSignatures: sinon.stub().resolves(signatures), // Mock signatures
            };


            const getEvmBridgeContractStub = sinon.stub(utils, "getEvmBridgeContract")
            getEvmBridgeContractStub.returns({
                ...getEvmBridgeContractStub[1],
                ...bridgeContractStub
            })

            const getStorageContractStub = sinon.stub(utils, "getStorageContract").resolves(storageContractStub);
            getStorageContractStub.returns({
                ...getStorageContractStub[1],
                ...storageContractStub
            })

            // overriding; wallets already funded
            sinon.stub(promts, "isEvmChainFunded").resolves(true);


            // Call the function
            await handleEvmValidatorAddition({
                storageChainConfig: mockBridgeConfig.storageConfig,
                evmChainConfig: mockBridgeConfig.bridgeChains[0],
                evmWallet: mockWallets.evmWallet,
            });



            expect(bridgeContractStub.addValidator.calledOnceWith(mockWallets.evmWallet.address, signatures.map(item => item.signature))).equals(addValidatorCalled);
        });
    })

});
