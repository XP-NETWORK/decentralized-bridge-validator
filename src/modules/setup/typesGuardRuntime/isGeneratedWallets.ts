import { IGeneratedWallets } from "@src/types";
import isEvmWallet from "./isEvmWallet";
import isMultiversXWallet from "./isMultiversXWallet";

function isGeneratedWallets(object: unknown): object is IGeneratedWallets {
    if (typeof object !== 'object' || object === null) {
        return false;
    }
    const generatedWallets = object as Record<string, object>;
    return 'evmWallet' in generatedWallets && 'multiversXWallet' in generatedWallets &&
        isEvmWallet(generatedWallets.evmWallet) && isMultiversXWallet(generatedWallets.multiversXWallet);
}

export default isGeneratedWallets