import { IConfigAndWallets, IEvmChainConfig, ISecretChainConfig, ITonChainConfig } from "@src/types";

interface IEvmLockListener extends IConfigAndWallets {
    evmChainConfig: IEvmChainConfig
}

interface ITonLockListener extends IConfigAndWallets {
    tonChainConfig: ITonChainConfig
}

interface ISecretLockListener extends IConfigAndWallets {
    secretChainConfig: ISecretChainConfig
}

export { IEvmLockListener, ITonLockListener, ISecretLockListener }