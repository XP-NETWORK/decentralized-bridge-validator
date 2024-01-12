import {
  type IConfigAndWallets,
  type IEvmChainConfig,
  type IHederaChainConfig,
  type ISecretChainConfig,
  type ITezosChainConfig,
  type ITonChainConfig
} from '@src/types'

interface IEvmLockListener extends IConfigAndWallets {
  evmChainConfig: IEvmChainConfig
}
interface IHederaLockListener extends IConfigAndWallets {
  hederaChainConfig: IHederaChainConfig
}

interface ITonLockListener extends IConfigAndWallets {
  tonChainConfig: ITonChainConfig
}

interface ISecretLockListener extends IConfigAndWallets {
  secretChainConfig: ISecretChainConfig
}

interface ITezosLockListener extends IConfigAndWallets {
  tezosChainConfig: ITezosChainConfig
}

export type {
  IEvmLockListener,
  ITonLockListener,
  ISecretLockListener,
  ITezosLockListener,
  IHederaLockListener
}
