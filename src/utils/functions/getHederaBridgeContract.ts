import { ethers } from 'ethers';
import { Bridge, Bridge__factory } from '../../contractsTypes';
import { IBridge, IHederaChainConfigAndEvmWallet } from '@src/types';
import { SupportedChains } from '@src/config/chainSpecs';

export type HederaLockArgs = {
    sourceNftContractAddress: string;
    tokenId: string;
    destinationChain: SupportedChains;
    address: string;
};

const getHederaBridgeContract = ({
    hederaChainConfig,
    evmWallet,
}: IHederaChainConfigAndEvmWallet): IBridge<
    HederaLockArgs,
    Bridge.ClaimDataStruct
> => {
    const provider = new ethers.JsonRpcProvider(hederaChainConfig.rpcURL);
    const wallet = new ethers.Wallet(evmWallet.privateKey, provider);
    const contract = Bridge__factory.connect(
        hederaChainConfig.contractAddress,
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
        claimNFT1155: async (cd, sigs) =>
            contract.claimNFT1155(
                cd,
                sigs.map((e) => e.signature),
                {
                    value: cd.fee,
                },
            ),

        claimNFT721: async (cd, sigs) =>
            contract.claimNFT721(
                cd,
                sigs.map((e) => e.signature),
                {
                    value: cd.fee,
                },
            ),
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

export default getHederaBridgeContract;
