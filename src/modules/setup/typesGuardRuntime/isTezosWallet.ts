import { type ITezosWallet } from '@src/types'

function isTezosWallet (object: unknown): object is ITezosWallet {
  if (typeof object !== 'object' || object === null) {
    return false
  }
  const tezosWallet = object as Record<string, unknown>

  return (
    typeof tezosWallet === 'object' &&
        tezosWallet !== null &&
        'publicKey' in tezosWallet &&
        typeof tezosWallet.publicKey === 'string' &&
        'secretKey' in tezosWallet &&
        typeof tezosWallet.secretKey === 'string'
  )
}

export default isTezosWallet
