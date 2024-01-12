import { expect } from 'chai'
import sinon from 'sinon'
import { isEvmChainFunded } from '@src/modules/setup/components/getInitialFunds/components/promptToGetFunding/components'
import * as utils from '@src/utils/functions'
import { mockBridgeConfig, mockWallets } from '@src/test/mockData'
import { type IEvmChainConfig } from '@src/types'

describe('isEvmChainFunded', () => {
  const testCases = [
    {
      description: 'should return true if the chain is funded',
      evmChainConfig_: {
        intialFund: '10'
      },
      balance: BigInt('10'), // Balance greater than initial fund
      expected: true
    },
    {
      description:
                'should return true if the chain is funded more then asked intialFund',
      evmChainConfig_: {
        intialFund: '10'
      },
      balance: BigInt('1000'), // Balance greater than initial fund
      expected: true
    },
    {
      description: 'should return false if the chain is not funded',
      evmChainConfig_: {
        intialFund: '10'
      },
      balance: BigInt('9'), // Balance less than initial fund
      expected: false
    },
    {
      description: 'should throw an error on exception',
      evmChainConfig_: {
        intialFund: '10'
      },
      balance: BigInt('5'), // Any balance
      throwError: true
    }
  ]

  afterEach(() => {
    sinon.restore()
  })
  beforeEach(() => {
    console.info = () => {}
  })

  testCases.forEach(
    ({ description, evmChainConfig_, balance, expected, throwError }) => {
      it(description, async () => {
        const { evmWallet } = mockWallets
        const evmChainConfig = {
          ...(mockBridgeConfig.bridgeChains.find(
            (item) => item.chain === 'evm'
          ) as IEvmChainConfig),
          ...evmChainConfig_
        }

        if (throwError) {
          // Stub getCurrentEvmBalance to throw an error
          sinon
            .stub(utils, 'getCurrentEvmBalance')
            .rejects(new Error('Balance fetch failed'))
        } else {
          // Stub getCurrentEvmBalance to return a balance
          sinon.stub(utils, 'getCurrentEvmBalance').resolves(balance)
        }

        try {
          const result = await isEvmChainFunded({
            evmChainConfig,
            evmWallet
          })
          expect(result).to.equal(expected)
        } catch (error) {
          if (!throwError) {
            // Ensure the function doesn't throw an error when not expected
            throw error
          }
          console.info(
            error,
            '---------------------------------------'
          )
          expect(error).to.equal(
            'Error while isEvmChainFunded, orignal error: Error: Balance fetch failed'
          )
        }
      })
    }
  )
})
