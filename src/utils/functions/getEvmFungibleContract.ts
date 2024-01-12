import { ethers } from 'ethers'

import { type ERC20Token, ERC20Token__factory } from '../../contractsTypes'
import { type IStakingChainConfigAndEvmWallet } from '@src/types'

const getEvmFungibleContract = ({
  stakingChainConfig,
  evmWallet
}: IStakingChainConfigAndEvmWallet): ERC20Token => {
  const provider = new ethers.JsonRpcProvider(stakingChainConfig.rpcURL)
  const wallet = new ethers.Wallet(evmWallet.privateKey, provider)

  return ERC20Token__factory.connect(stakingChainConfig.coinAddress, wallet)
}

export default getEvmFungibleContract
