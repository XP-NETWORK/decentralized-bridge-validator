import { IConfigAndWallets, IEvmChainConfig, ITonChainConfig } from "@src/types";

interface IEvmLockListener extends IConfigAndWallets {
    evmChainConfig: IEvmChainConfig
}

interface ITonLockListener extends IConfigAndWallets {
    tonChainConfig: ITonChainConfig
}

export { IEvmLockListener, ITonLockListener }