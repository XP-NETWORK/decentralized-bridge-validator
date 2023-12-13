import { IGeneratedWallets } from "@src/types";
import { isEvmWallet, isMultiversXWallet, isSecretWallet, isTonWallet } from ".";

function isGeneratedWallets(object: unknown): object is IGeneratedWallets {
    if (typeof object !== 'object' || object === null) {
        return false;
    }
    const generatedWallets = object as Record<string, object>;

    const existingWalletsFound = (
        'evmWallet' in generatedWallets &&
        'multiversXWallet' in generatedWallets &&
        'tonWallet' in generatedWallets &&
        'secretWallet' in generatedWallets &&
        isEvmWallet(generatedWallets.evmWallet) &&
        isMultiversXWallet(generatedWallets.multiversXWallet) &&
        isTonWallet(generatedWallets.tonWallet) &&
        isSecretWallet(generatedWallets.secretWallet)
    )

    return existingWalletsFound;
}

export default isGeneratedWallets