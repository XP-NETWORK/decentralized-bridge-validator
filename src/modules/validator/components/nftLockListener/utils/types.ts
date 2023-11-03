import { IEvmWallet } from "@src/types";

interface IGetEvmNftDetails {
    sourceNftContractAddress: string;
    sourceChainRpcURL: string;
    evmWallet: IEvmWallet;
    tokenId: string;
    nftType: string;
}


export { IGetEvmNftDetails }