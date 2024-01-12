import { evmContractListener } from '@src/modules/validator/utils'
import { getEvmLockListenerHandler } from './utils'
import { type IEvmLockListener } from '../../types'

const evmLockListener = async ({
  config,
  evmChainConfig,
  wallets
}: IEvmLockListener) => {
  const {
    contractAddress,
    rpcURL,
    lastBlock: lastBlock_,
    chain
  } = evmChainConfig

  const handleLog = getEvmLockListenerHandler({
    config,
    evmChainConfig,
    wallets
  })

  try {
    await evmContractListener({
      contractAddress,
      rpcURL,
      lastBlock_,
      chain,
      handleLog
    })
  } catch (e) {
    console.error('Error in evmLockListener', evmChainConfig.chain, e)
  }
}

export default evmLockListener
