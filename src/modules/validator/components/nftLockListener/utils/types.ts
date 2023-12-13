import { IEvmWallet, TChain } from "@src/types";

interface IGetEvmNftDetails {
    sourceNftContractAddress: string;
    sourceChain: TChain;
    evmWallet: IEvmWallet;
    tokenId: string;
    nftType: string;
}


export { IGetEvmNftDetails }