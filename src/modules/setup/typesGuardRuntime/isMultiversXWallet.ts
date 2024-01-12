import { IMultiversXWallet } from '@src/types';

function isMultiversXWallet(object: unknown): object is IMultiversXWallet {
    if (typeof object !== 'object' || object === null) {
        return false;
    }

    const multiversXWallet = object as Record<string, unknown>;

    const hasPassword =
        'password' in multiversXWallet &&
        typeof multiversXWallet.password === 'string';

    const hasUserWallet =
        'userWallet' in multiversXWallet &&
        typeof multiversXWallet.userWallet === 'object' &&
        multiversXWallet.userWallet !== null;

    if (!hasPassword || !hasUserWallet) {
        return false;
    }

    // Check the userWallet object structure
    const userWallet = multiversXWallet.userWallet as Record<string, unknown>;

    const hasVersion =
        'version' in userWallet && typeof userWallet.version === 'number';
    const hasKind = 'kind' in userWallet && typeof userWallet.kind === 'string';
    const hasId = 'id' in userWallet && typeof userWallet.id === 'string';
    const hasAddress =
        'address' in userWallet && typeof userWallet.address === 'string';
    const hasBech32 =
        'bech32' in userWallet && typeof userWallet.bech32 === 'string';
    const hasCrypto =
        'crypto' in userWallet &&
        typeof userWallet.crypto === 'object' &&
        userWallet.crypto !== null;

    if (
        !hasVersion ||
        !hasKind ||
        !hasId ||
        !hasAddress ||
        !hasBech32 ||
        !hasCrypto
    ) {
        return false;
    }

    return true;
}

export default isMultiversXWallet;
