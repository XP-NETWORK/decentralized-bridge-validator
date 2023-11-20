import { ITonChainConfigAndTonWallet } from "@src/types";
import TonWeb from "tonweb";





const getCurrentTonBalance_ = async ({ tonChainConfig, tonWallet }: ITonChainConfigAndTonWallet) => {

    const tonweb = new TonWeb(new TonWeb.HttpProvider(tonChainConfig.rpcURL));
    try {
        const walletClass = tonweb.wallet.all['v4R2'];

        const wallet = new walletClass(tonweb.provider, { publicKey: TonWeb.utils.hexToBytes(tonWallet.publicKey) });

        const walletAddress = await wallet.getAddress();

        const balance = await tonweb.provider.getBalance(
            walletAddress.toString()
        );

        return balance;
    } catch (e) {
        throw new Error("Failed to fetch balance")
    }

}

const getCurrentTonBalance = async ({ tonChainConfig, tonWallet }: ITonChainConfigAndTonWallet) => {
    const tonweb = new TonWeb(new TonWeb.HttpProvider(tonChainConfig.rpcURL));

    try {
        return await getCurrentTonBalance_({ tonChainConfig, tonWallet })
    } catch (e) {

        try {
            const walletClass = tonweb.wallet.all['v4R2'];
            const wallet = new walletClass(tonweb.provider, { publicKey: TonWeb.utils.hexToBytes(tonWallet.publicKey) });
            const deployTx = wallet.deploy(TonWeb.utils.hexToBytes(tonWallet.secretKey))

            const deployTxResult = await deployTx.send()
            console.log({ deployTxResult })

            return getCurrentTonBalance_({ tonChainConfig, tonWallet })

        } catch (e) {
            console.log(e)
            return "0"
        }
    }

}

export default getCurrentTonBalance