import { TChain } from '@src/types';

type IGetEvmNftDetails = {
    sourceNftContractAddress: string;
    sourceChain: TChain;
    tokenId: string;
    nftType: string;
};

export { IGetEvmNftDetails };
