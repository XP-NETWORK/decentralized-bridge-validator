import { type ISecretChainConfigAndSecretWallet } from '@src/types'
import { SecretNetworkClient, pubkeyToAddress } from 'secretjs'

const getCurrentSecretBalance = async (
  configs: ISecretChainConfigAndSecretWallet
): Promise<bigint> => {
  try {
    const secretjs = new SecretNetworkClient({
      url: configs.secretChainConfig.rpcURL,
      chainId: configs.secretChainConfig.chainId
    })
    const address = pubkeyToAddress(
      Buffer.from(configs.secretWallet.publicKey)
    )
    const { balance } = await secretjs.query.bank.balance({
      address,
      denom: 'uscrt'
    })

    return BigInt(balance.amount)
  } catch (e) {
    console.log(e)
    console.error('RPC issue:', { configs })
    throw 'Error while getCurrentSecretBalance'
  }
}

export default getCurrentSecretBalance
