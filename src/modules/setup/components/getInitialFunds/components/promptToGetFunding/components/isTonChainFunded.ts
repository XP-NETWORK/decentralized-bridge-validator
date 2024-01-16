import TonWeb from 'tonweb';
import { ITonChainConfigAndTonWallet } from '@src/types';
import { getCurrentTonBalance } from '@src/utils';

const isTonChainFunded = async ({
    tonChainConfig,
    tonWallet,
}: ITonChainConfigAndTonWallet): Promise<boolean> => {
    let isFunded = true;
    try {
        const tonweb = new TonWeb(
            new TonWeb.HttpProvider(tonChainConfig.rpcURL),
        );

        const currentBalance = await getCurrentTonBalance({
            tonChainConfig,
            tonWallet,
        });

        const walletClass = tonweb.wallet.all['v4R2'];

        const wallet = new walletClass(tonweb.provider, {
            publicKey: TonWeb.utils.hexToBytes(tonWallet.publicKey),
        });
        const remainingRaw =
            BigInt(tonChainConfig.intialFund) - BigInt(currentBalance);

        const remainingFund = tonweb.utils.fromNano(remainingRaw.toString());

        if (currentBalance < BigInt(tonChainConfig.intialFund)) {
            isFunded = false;
            console.info(
                `Current balance: ${tonweb.utils.fromNano(currentBalance)}; Fund chain your wallet ${await wallet.getAddress()} on ${tonChainConfig.chain} with ${remainingFund} ${tonChainConfig.nativeCoinSymbol}.`,
            );
        }

        return isFunded;
    } catch (e) {
        throw `Error while isTonChainFunded, orignal error: ${e}`;
    }
};

export default isTonChainFunded;
