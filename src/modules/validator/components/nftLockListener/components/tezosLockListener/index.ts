import { tezosContractListener } from '@src/modules/validator/utils'
import { getTezosLockListenerHandler } from './utils'
import { type ITezosLockListener } from '../../types'

const tezosLockListener = async ({
  config,
  tezosChainConfig,
  wallets
}: ITezosLockListener) => {
  const {
    contractAddress,
    lastBlock: lastBlock_,
    chain,
    restApiURL,
    rpcURL
  } = tezosChainConfig

  const handleLog = getTezosLockListenerHandler({
    config,
    tezosChainConfig,
    wallets
  })

  try {
    await tezosContractListener({
      contractAddress,
      restApiURL,
      rpcURL,
      lastBlock_,
      chain,
      handleLog,
      eventId: 'locked'
    })
  } catch (e) {
    console.error('Error in tezosLockListener', tezosChainConfig.chain, e)
  }
}

export default tezosLockListener
