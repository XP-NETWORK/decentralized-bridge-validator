import { ethers } from 'ethers'
import { type Bridge, Bridge__factory } from '../../contractsTypes'
import {
  IEvmChainConfigAndEvmWallet,
  type IHederaChainConfigAndEvmWallet
} from '@src/types'

const getHederaBridgeContract = ({
  hederaChainConfig,
  evmWallet
}: IHederaChainConfigAndEvmWallet): Bridge => {
  const provider = new ethers.JsonRpcProvider(hederaChainConfig.rpcURL)
  const wallet = new ethers.Wallet(evmWallet.privateKey, provider)
  return Bridge__factory.connect(hederaChainConfig.contractAddress, wallet)
}

export default getHederaBridgeContract
