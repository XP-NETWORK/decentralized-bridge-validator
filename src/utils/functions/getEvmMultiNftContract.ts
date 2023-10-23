import { ethers } from "ethers";
import { ERC1155Royalty__factory, ERC1155Royalty } from "../../contractsTypes";


const getEvmMultiNftContract = ({ contractConfig, evmWallet }: IContractConfigAndEvmWallet): ERC1155Royalty => {
    const opProvider = new ethers.JsonRpcProvider(contractConfig.rpcURL);
    const opWallet = new ethers.Wallet(evmWallet.privateKey, opProvider);
    return ERC1155Royalty__factory.connect(contractConfig.contractAddress, opWallet);
}

export default getEvmMultiNftContract