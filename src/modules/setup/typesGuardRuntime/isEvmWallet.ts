import { IEvmWallet } from "../types";

function isEvmWallet(object: unknown): object is IEvmWallet {

    if (typeof object !== 'object' || object === null) {
        return false;
    }
    const evmWallet = object as Record<string, unknown>;

    return typeof evmWallet === 'object' &&
        evmWallet !== null && 'address' in evmWallet &&
        typeof evmWallet.address === 'string' &&
        'privateKey' in evmWallet &&
        typeof evmWallet.privateKey === 'string';
}

export default isEvmWallet

