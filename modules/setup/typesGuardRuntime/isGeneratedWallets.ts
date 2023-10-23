import { IGeneratedWallets } from "../types";
import isEvmWallet from "./isEvmWallet";

function isGeneratedWallets(object: unknown): object is IGeneratedWallets {
    return typeof object === 'object' &&
        object !== null && 'evmWallet' in object &&
        isEvmWallet(object.evmWallet);
}

export default isGeneratedWallets