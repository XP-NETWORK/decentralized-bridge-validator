import { IConfigAndWallets, IEvmChainConfig } from "@src/types";

interface IEvmLockListener extends IConfigAndWallets {
    evmChainConfig: IEvmChainConfig
}

export { IEvmLockListener }