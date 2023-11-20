import { IGeneratedWallets } from "@src/types";
import { isEvmWallet, isMultiversXWallet, isTonWallet } from ".";

function isGeneratedWallets(object: unknown): object is IGeneratedWallets {
    if (typeof object !== 'object' || object === null) {
        return false;
    }
    const generatedWallets = object as Record<string, object>;

    const existingWalletsFound = (
        'evmWallet' in generatedWallets &&
        'multiversXWallet' in generatedWallets &&
        'tonWallet' in generatedWallets &&
        isEvmWallet(generatedWallets.evmWallet) &&
        isMultiversXWallet(generatedWallets.multiversXWallet) &&
        isTonWallet(generatedWallets.tonWallet)
    )

    return existingWalletsFound;
}

export default isGeneratedWallets