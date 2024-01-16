import { ITezosChainConfigAndTezosWallet } from '@src/types';
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

const getCurrentTezosBalance = async (
    configs: ITezosChainConfigAndTezosWallet,
): Promise<bigint> => {
    try {
        const Tezos = new TezosToolkit(configs.tezosChainConfig.rpcURL);
        const tezosSigner = await InMemorySigner.fromSecretKey(
            configs.tezosWallet.secretKey,
        );
        Tezos.setProvider({ signer: tezosSigner });
        const balance = await Tezos.tz.getBalance(
            await tezosSigner.publicKeyHash(),
        );
        return BigInt(balance.toString());
    } catch (e) {
        console.log(e);
        console.error('RPC issue:', { configs });
        throw 'Error while getCurrentTezosBalance';
    }
};

export default getCurrentTezosBalance;
