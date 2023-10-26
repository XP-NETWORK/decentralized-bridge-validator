import { expect } from 'chai';
import sinon from 'sinon';
import * as utils from "@src/utils/functions"
import { mockBridgeConfig, mockWallets } from '@src/test/mockData';
import * as stakeUtils from '@src/modules/setup/components';
import { stakeTokens } from '@src/modules/setup/components';

describe('stakeTokens', () => {


    beforeEach(() => {
        console.info = () => { };
    });

    afterEach(() => {
        sinon.restore();
    });

    const testCases = [
        {
            description: 'should not try to restake if already staked',
            isStaked: true,
            approveThrows: [{ throws: false }],
            stakeERC20Throws: [{ throws: false }],
            callCountApprove: 0,
            callCountStake: 0,
        },
        {
            description: 'should try to restake if not already staked',
            isStaked: false,
            approveThrows: [{ throws: false }],
            stakeERC20Throws: [{ throws: false }],
            callCountApprove: 1,
            callCountStake: 1,
        },
        {
            description: 'should try to restake if not already staked & approve throws',
            isStaked: false,
            approveThrows: [{ throws: true, reason:  { shortMessage: 'execution reverted: "Approve Failed"' }  }, { throws: false }],
            stakeERC20Throws: [{ throws: false }],
            callCountApprove: 2,
            callCountStake: 1,
        },
        {
            description: 'should not try to restake on race condtion; isStaked returns true, stakeERC20Throws throws "You can only stake once"',
            isStaked: false,
            approveThrows: [{ throws: false }],
            stakeERC20Throws: [{ throws: true, reason: { shortMessage: 'execution reverted: "You can only stake once"' } }],
            callCountApprove: 1,
            callCountStake: 1,
        },
        {
            description: 'should try to restake if not able to stake in first try"',
            isStaked: false,
            approveThrows: [{ throws: false }, { throws: false }],
            stakeERC20Throws: [{ throws: true, reason: { shortMessage: 'execution reverted: "Gas Fee estimate issue"' } }, {throw: false}],
            callCountApprove: 2,
            callCountStake: 2,
        },
    ];

    testCases.forEach(({
        description,
        isStaked,
        stakeERC20Throws,
        approveThrows,
        callCountApprove,
        callCountStake,
    }) => {
        it(description, async () => {

            const hash = "some unique hash";
            const { stakingConfig } = mockBridgeConfig;
            const { evmWallet } = mockWallets;


            sinon.stub(utils, "waitForMSWithMsg").resolves();

            const stakeERC20Stub = sinon.stub();

            stakeERC20Throws.forEach((shouldThrow, index) => {
                if (shouldThrow.throws)
                    stakeERC20Stub.onCall(index).rejects("reason" in shouldThrow ? shouldThrow.reason : "")
                else
                    stakeERC20Stub.onCall(index).resolves({ hash, wait: sinon.stub().resolves() })
            })

            const stakingContractStub = {
                stakeERC20: sinon.stub().callsFake(stakeERC20Stub)
            };


            const approveStub = sinon.stub();

            approveThrows.forEach((shouldThrow, index) => {
                if (shouldThrow.throws)
                    approveStub.onCall(index).rejects("reason" in shouldThrow ? shouldThrow.reason : "")
                else
                    approveStub.onCall(index).resolves({ hash, wait: sinon.stub().resolves() })
            })


            const tokenContractStub = {
                approve: sinon.stub().callsFake(approveStub)
            };


            const getStakingContractStub = sinon.stub(utils, "getStakingContract")
            getStakingContractStub.returns({
                ...getStakingContractStub[1],
                ...stakingContractStub
            })

            const getEvmFungibleContractStub = sinon.stub(utils, "getEvmFungibleContract");
            getEvmFungibleContractStub.returns({
                ...getEvmFungibleContractStub[1],
                ...tokenContractStub
            })

            sinon.stub(stakeUtils, "isStaked").resolves(isStaked);





            // Call the function
            await stakeTokens({ stakingChainConfig: stakingConfig, evmWallet })


            expect(stakingContractStub.stakeERC20.callCount).to.equal(callCountStake);
            expect(tokenContractStub.approve.callCount).to.equal(callCountApprove);
        });
    })

});
