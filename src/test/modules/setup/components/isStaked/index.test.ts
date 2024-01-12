import { expect } from 'chai'
import sinon from 'sinon'
import { isStaked } from '@src/modules/setup/components'
import * as utils from '@src/utils/functions'
import { mockBridgeConfig, mockWallets } from '@src/test/mockData'

describe('isStaked', () => {
  const testCases = [
    {
      stakedAmount: BigInt(100),
      expected: true,
      description:
                'should return true if stakedAmount is greater than zero'
    },
    {
      stakedAmount: BigInt(0),
      expected: false,
      description: 'should return false if stakedAmount is zero'
    }
  ]

  afterEach(() => {
    sinon.restore()
  })
  beforeEach(() => {
    console.info = () => {}
  })

  testCases.forEach(({ stakedAmount, expected, description }) => {
    it(description, async () => {
      const stakingContractStub = {
        stakingBalances: sinon.stub().resolves(stakedAmount)
      }
      const getStakingContractStub = sinon.stub(
        utils,
        'getStakingContract'
      )
      getStakingContractStub.returns({
        ...getStakingContractStub[1],
        ...stakingContractStub
      })

      const result = await isStaked({
        stakingChainConfig: mockBridgeConfig.stakingConfig,
        evmWallet: mockWallets.evmWallet
      })
      expect(result).to.equal(expected)
    })
  })
})
