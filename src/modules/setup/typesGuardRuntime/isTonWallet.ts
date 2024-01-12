import { type ITonWallet } from '@src/types'

function isTonWallet (object: unknown): object is ITonWallet {
  if (typeof object !== 'object' || object === null) {
    return false
  }
  const tonWallet = object as Record<string, unknown>

  return (
    typeof tonWallet === 'object' &&
        tonWallet !== null &&
        'publicKey' in tonWallet &&
        typeof tonWallet.publicKey === 'string' &&
        'secretKey' in tonWallet &&
        typeof tonWallet.secretKey === 'string'
  )
}

export default isTonWallet
