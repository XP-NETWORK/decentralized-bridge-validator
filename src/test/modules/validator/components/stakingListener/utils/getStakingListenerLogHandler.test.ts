import sinon from 'sinon'
import { expect } from 'chai'
import * as stakingEventUtils from '@src/modules/validator/components/stakingListener/utils'
import * as stakingComponents from '@src/modules/validator/components/stakingListener/stakingListenerJob/components'
import { mockBridgeConfig, mockWallets } from '@src/test/mockData'

describe('getStakingListenerLogHandler', () => {
  beforeEach(() => {
    console.info = () => {}
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should be able to approve stake', async () => {
    const getStakeEventDecodedLogStub = sinon
      .stub(stakingEventUtils, 'getStakeEventDecodedLog')
      .returns({
        validatorAddressAndChainType: [
          {
            validatorAddress:
                            '0x8f1fd3a5dbbd5659579ae7d9b258cc6cbcb3e53d',
            chainType: 'evm'
          }
        ]
      })
    const approveStakeStub = sinon
      .stub(stakingComponents, 'approveStake')
      .resolves()

    const handleLog = stakingEventUtils.getStakingListenerLogHandler({
      config: mockBridgeConfig,
      wallets: mockWallets
    })

    await handleLog({
      log: {
        address: '0x8f1fd3a5dbbd5659579ae7d9b258cc6cbcb3e53d',
        topics: [
          '0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d',
          '0x00000000000000000000000067081bd856e29d7d7b3028c34afb331fa6b3186e'
        ],
        data: '0x0000000000000000000000000000000000000000000000056bc75e2d63100000',
        blockNumber: BigInt('34603042'),
        transactionHash:
                    '0x9f82e0133481e667af275a047daa7113fce293101c2af792fed5676df6ee5ada',
        transactionIndex: BigInt(1),
        blockHash:
                    '0x89fd9da1073ee98652c17b1d5700cb10a79fcc9262bc63dcf4e1fb75ecf8616a',
        logIndex: BigInt(9),
        removed: false
      }
    })

    expect(getStakeEventDecodedLogStub.calledOnce).to.be.true
    expect(approveStakeStub.calledOnce).to.be.true
  })
})
