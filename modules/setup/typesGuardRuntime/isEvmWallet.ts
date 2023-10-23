import { IEvmWallet } from "../types";

function isEvmWallet(object: unknown): object is IEvmWallet {
    return typeof object === 'object' &&
        object !== null && 'address' in object &&
        typeof object.address === 'string' &&
        'privateKey' in object &&
        typeof object.privateKey === 'string';
}

export default isEvmWallet

