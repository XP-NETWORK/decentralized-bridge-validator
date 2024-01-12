import { type IConfigAndWallets } from '@src/types'
import { getStakingListenerLogHandler } from '../utils'
import { evmContractListener } from '@src/modules/validator/utils'

const stakingListenerJob = async (jobData: IConfigAndWallets) => {
  const { config, wallets }: IConfigAndWallets = jobData

  const handleLog = getStakingListenerLogHandler({ config, wallets })

  try {
    const {
      contractAddress,
      rpcURL,
      lastBlock: lastBlock_,
      chain
    } = config.stakingConfig
    await evmContractListener({
      contractAddress,
      rpcURL,
      lastBlock_,
      chain,
      handleLog
    })
  } catch (e) {
    console.error('Error Staking listner', e)
  }
}

export default stakingListenerJob
