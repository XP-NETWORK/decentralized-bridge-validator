import { ethers } from "ethers";
import { IContractConfigAndEvmWallet } from "../types";
import { ERC721Royalty__factory, ERC721Royalty } from "../../contractsTypes";


const getEvmSingleNftContract = ({ contractConfig, evmWallet }: IContractConfigAndEvmWallet): ERC721Royalty => {
    const provider = new ethers.JsonRpcProvider(contractConfig.rpcURL);
    const wallet = new ethers.Wallet(evmWallet.privateKey, provider);
    return ERC721Royalty__factory.connect(contractConfig.contractAddress, wallet);
}

export default getEvmSingleNftContract