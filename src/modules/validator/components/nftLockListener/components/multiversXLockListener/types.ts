import { IConfigAndWallets, IMultiversXChainConfig } from "@src/types";

interface IMultiversXLockListener extends IConfigAndWallets {
    multiversXChainConfig: IMultiversXChainConfig
}

export { IMultiversXLockListener }