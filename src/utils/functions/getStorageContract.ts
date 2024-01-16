import { ethers } from 'ethers';

import { BridgeStorage, BridgeStorage__factory } from '../../contractsTypes';
import { IEvmChainConfigAndEvmWallet } from '@src/types';

const getStorageContract = ({
    evmChainConfig,
    evmWallet,
}: IEvmChainConfigAndEvmWallet): BridgeStorage => {
    const opProvider = new ethers.JsonRpcProvider(evmChainConfig.rpcURL);
    const opWallet = new ethers.Wallet(evmWallet.privateKey, opProvider);
    return BridgeStorage__factory.connect(
        evmChainConfig.contractAddress,
        opWallet,
    );
};

export default getStorageContract;
