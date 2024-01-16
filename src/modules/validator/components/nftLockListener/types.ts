import {
    IConfigAndWallets,
    IEvmChainConfig,
    IHederaChainConfig,
    ISecretChainConfig,
    ITezosChainConfig,
    ITonChainConfig,
} from '@src/types';

type IEvmLockListener = {
    evmChainConfig: IEvmChainConfig;
} & IConfigAndWallets;
type IHederaLockListener = {
    hederaChainConfig: IHederaChainConfig;
} & IConfigAndWallets;

type ITonLockListener = {
    tonChainConfig: ITonChainConfig;
} & IConfigAndWallets;

type ISecretLockListener = {
    secretChainConfig: ISecretChainConfig;
} & IConfigAndWallets;

type ITezosLockListener = {
    tezosChainConfig: ITezosChainConfig;
} & IConfigAndWallets;

export {
    IEvmLockListener,
    ITonLockListener,
    ISecretLockListener,
    ITezosLockListener,
    IHederaLockListener,
};
