import { BytesLike, ethers } from 'ethers';
import { Bridge, Bridge__factory } from '../../contractsTypes';
import { IBridge, IEvmChainConfigAndEvmWallet } from '@src/types';
import { SupportedChains } from '@src/config/chainSpecs';

export type EvmLockArgs = {
    sourceNftContractAddress: string;
    tokenId: string;
    destinationChain: SupportedChains;
    address: string;
};

const getEvmBridgeContract = ({
    evmChainConfig,
    evmWallet,
}: IEvmChainConfigAndEvmWallet): IBridge<
    EvmLockArgs,
    Bridge.ClaimDataStruct,
    BytesLike
> => {
    const provider = new ethers.JsonRpcProvider(evmChainConfig.rpcURL);
    const wallet = new ethers.Wallet(evmWallet.privateKey, provider);
    const contract = Bridge__factory.connect(
        evmChainConfig.contractAddress,
        wallet,
    );
    return {
        addValidator: contract.addValidator,

        validators: contract.validators,
        validatorsCount: contract.validatorsCount,
        lock1155({
            address,
            amt,
            destinationChain,
            sourceNftContractAddress,
            tokenId,
        }) {
            return contract.lock1155(
                tokenId,
                destinationChain,
                address,
                sourceNftContractAddress,
                amt,
            );
        },
        claimNFT1155: contract.claimNFT1155,

        claimNFT721: contract.claimNFT721,
        lock721({
            address,
            destinationChain,
            sourceNftContractAddress,
            tokenId,
        }) {
            return contract.lock721(
                tokenId,
                destinationChain,
                address,
                sourceNftContractAddress,
            );
        },
    };
};

export default getEvmBridgeContract;
