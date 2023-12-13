import { ISecretWallet } from "@src/types";

function isSecretWallet(object: unknown): object is ISecretWallet {

    if (typeof object !== 'object' || object === null) {
        return false;
    }
    const secretWallet = object as Record<string, unknown>;

    return typeof secretWallet === 'object' &&
        secretWallet !== null && 'publicKey' in secretWallet &&
        typeof secretWallet.publicKey === 'string' &&
        'privateKey' in secretWallet &&
        typeof secretWallet.privateKey === 'string';
}

export default isSecretWallet
