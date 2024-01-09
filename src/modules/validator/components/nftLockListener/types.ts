import { IConfigAndWallets, IEvmChainConfig, IHederaChainConfig, ISecretChainConfig, ITezosChainConfig, ITonChainConfig } from "@src/types";

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

export { IEvmLockListener, ITonLockListener, ISecretLockListener, ITezosLockListener, IHederaLockListener }