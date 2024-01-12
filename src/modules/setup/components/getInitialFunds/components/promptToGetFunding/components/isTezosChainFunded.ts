import { ITezosChainConfigAndTezosWallet } from '@src/types';
import { b58cencode, prefix, b58cdecode } from '@taquito/utils';
import { hash } from '@stablelib/blake2b';
import { address } from '@src/contractsTypes/tezosContractTypes/type-aliases';
import { getCurrentTezosBalance } from '@src/utils';

const formatTezos = (amount: bigint) => {
    return Number(amount) / 1e6;
};

const isTezosChainFunded = async ({
    tezosChainConfig,
    tezosWallet,
}: ITezosChainConfigAndTezosWallet): Promise<boolean> => {
    let isFunded = true;
    try {
        const currentBalance = await getCurrentTezosBalance({
            tezosChainConfig,
            tezosWallet,
        });
        const remainingRaw =
            BigInt(tezosChainConfig.intialFund) - BigInt(currentBalance);

        const remainingFund = formatTezos(remainingRaw);

        const addressToFund = b58cencode(
            hash(
                new Uint8Array(b58cdecode(tezosWallet.publicKey, prefix.edpk)),
                20,
            ),
            prefix.tz1,
        ) as address;
        if (currentBalance < BigInt(tezosChainConfig.intialFund)) {
            isFunded = false;
            console.info(
                `Current balance: ${formatTezos(
                    currentBalance,
                )}; Fund chain your wallet ${addressToFund} on ${
                    tezosChainConfig.chain
                } with ${remainingFund} ${tezosChainConfig.nativeCoinSymbol}.`,
            );
        }

        return isFunded;
    } catch (e) {
        throw `Error while isTezosChainFunded, orignal error: ${e}`;
    }
};

export default isTezosChainFunded;
