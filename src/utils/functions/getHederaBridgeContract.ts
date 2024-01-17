import { BytesLike, ethers } from 'ethers';
import { Bridge, Bridge__factory } from '../../contractsTypes';
import { IBridge, IHederaChainConfigAndEvmWallet } from '@src/types';
import { SupportedChains } from '@src/config/chainSpecs';

export type HederaLockArgs = [
    sourceNftContractAddress: string,
    tokenId: string,
    destinationChain: SupportedChains,
    address: string,
];

const getHederaBridgeContract = ({
    hederaChainConfig,
    evmWallet,
}: IHederaChainConfigAndEvmWallet): IBridge<
    HederaLockArgs,
    Bridge.ClaimDataStruct,
    BytesLike
> => {
    const provider = new ethers.JsonRpcProvider(hederaChainConfig.rpcURL);
    const wallet = new ethers.Wallet(evmWallet.privateKey, provider);
    return Bridge__factory.connect(hederaChainConfig.contractAddress, wallet);
};

export default getHederaBridgeContract;
