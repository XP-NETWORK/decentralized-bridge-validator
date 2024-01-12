import { expect } from 'chai'
import sinon from 'sinon'
import { promptToGetFunding } from '@src/modules/setup/components/getInitialFunds/components'
import * as utils from '@src/modules/setup/components/getInitialFunds/components/promptToGetFunding/components'
import { mockBridgeConfig, mockWallets } from '@src/test/mockData'

describe('promptToGetFunding', () => {
  const testCases = [
    {
      description: 'should return true if the all chains are funded',
      fundedChains: [
        ...mockBridgeConfig.bridgeChains.map((item) => item.chain),
        mockBridgeConfig.stakingConfig.chain,
        mockBridgeConfig.storageConfig.chain
      ],
      expected: true
    },
    {
      description: 'should return false one bridge chain not funded',
      fundedChains: [
        ...[
          ...mockBridgeConfig.bridgeChains.map((item) => item.chain)
        ].slice(1),
        mockBridgeConfig.stakingConfig.chain,
        mockBridgeConfig.storageConfig.chain
      ],
      expected: false
    },
    {
      description: 'should return false no bridge chains are funded',
      fundedChains: [
        mockBridgeConfig.stakingConfig.chain,
        mockBridgeConfig.storageConfig.chain
      ],
      expected: false
    },
    {
      description: 'should return false if staking chain is not funded',
      fundedChains: [
        ...mockBridgeConfig.bridgeChains.map((item) => item.chain),
        mockBridgeConfig.storageConfig.chain
      ],
      expected: false
    },
    {
      description: 'should return false if storage chain is not funded',
      fundedChains: [
        ...mockBridgeConfig.bridgeChains.map((item) => item.chain),
        mockBridgeConfig.stakingConfig.chain
      ],
      expected: false
    },
    {
      description: 'should return false if none of the chains are funded',
      fundedChains: [],
      expected: false
    }
  ]

  afterEach(() => {
    sinon.restore()
  })
  beforeEach(() => {
    console.info = () => {}
  })

  testCases.forEach(({ description, fundedChains, expected }) => {
    it(description, async () => {
      sinon
        .stub(utils, 'isEvmChainFunded')
        .callsFake(async ({ evmChainConfig }) => {
          return await Promise.resolve(
            fundedChains.includes(evmChainConfig.chain)
          ) // Resolve with true for funded chains
        })

      sinon
        .stub(utils, 'isMultiversXChainFunded')
        .callsFake(async ({ multiversXChainConfig }) => {
          return await Promise.resolve(
            fundedChains.includes(multiversXChainConfig.chain)
          ) // Resolve with true for funded chains
        })

      sinon
        .stub(utils, 'isStakingCoinFunded')
        .callsFake(async ({ stakingChainConfig }) => {
          return await Promise.resolve(
            fundedChains.includes(stakingChainConfig.chain)
          ) // Resolve with true if staking coin is funded
        })

      const result = await promptToGetFunding({
        config: mockBridgeConfig,
        wallets: mockWallets
      })
      expect(result).to.equal(expected)
    })
  })
})
