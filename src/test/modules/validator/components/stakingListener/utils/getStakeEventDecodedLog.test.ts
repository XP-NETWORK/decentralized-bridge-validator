import { getStakeEventDecodedLog } from '@src/modules/validator/components/stakingListener/utils'
import { expect } from 'chai'

describe('getLockEventDecodedLog', () => {
  const testCases = [
    {
      description: 'should decode a stake event log correctly',
      log: {
        data: '0x0000000000000000000000000000000000000000000000056bc75e2d63100000',
        topics: [
          '0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d',
          '0x00000000000000000000000067081bd856e29d7d7b3028c34afb331fa6b3186e'
        ]
      },
      expectedDecodedLog: '0x67081bD856e29d7D7B3028C34Afb331fa6b3186E'
    }
  ]

  testCases.forEach(({ description, log, expectedDecodedLog }) => {
    it(description, () => {
      const decodedLog = getStakeEventDecodedLog({ log })
      expect(decodedLog).to.deep.equal(expectedDecodedLog)
    })
  })
})
