import { IGeneratedWallets } from "../types";
import isEvmWallet from "./isEvmWallet";

function isGeneratedWallets(object: unknown): object is IGeneratedWallets {
    if (typeof object !== 'object' || object === null) {
        return false;
    }
    const generatedWallets = object as Record<string, object>;
    return 'evmWallet' in generatedWallets &&
        isEvmWallet(generatedWallets.evmWallet);
}

export default isGeneratedWallets