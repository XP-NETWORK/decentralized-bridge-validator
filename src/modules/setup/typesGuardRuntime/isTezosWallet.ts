import { ITezosWallet } from "@src/types";

function isTezosWallet(object: unknown): object is ITezosWallet {

    if (typeof object !== 'object' || object === null) {
        return false;
    }
    const tezosWallet = object as Record<string, unknown>;

    return typeof tezosWallet === 'object' &&
        tezosWallet !== null && 'publicKey' in tezosWallet &&
        typeof tezosWallet.publicKey === 'string' &&
        'privateKey' in tezosWallet &&
        typeof tezosWallet.privateKey === 'string';
}

export default isTezosWallet
