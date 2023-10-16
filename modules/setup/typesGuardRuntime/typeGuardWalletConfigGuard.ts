import { IWalletConfig } from "../types";

function typeGuardWalletConfigGuard(data: any): data is IWalletConfig {
    return (
        typeof data === 'object' &&
        typeof data.chain === 'string' &&
        typeof data.address === 'string' &&
        typeof data.privateKey === 'string'
    );
}

export default typeGuardWalletConfigGuard