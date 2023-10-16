import { IGeneratedWallets } from "../types";
import { typeGuardWalletConfigGuard } from ".";

function typeGuardGeneratedWallets(data: any): data is IGeneratedWallets {
    if (!typeGuardWalletConfigGuard(data.optimismChainWallet)) {
        return false;
    }

    if (!Array.isArray(data.bridgeChainsWallet)) {
        return false;
    }
    for (let walletConfig of data.bridgeChainsWallet) {
        if (!typeGuardWalletConfigGuard(walletConfig)) {
            return false;
        }
    }

    return true;
}

export default typeGuardGeneratedWallets