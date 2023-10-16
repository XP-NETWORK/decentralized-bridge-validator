import { ethers } from 'ethers';
import { erc20ABI } from '../../abi';


const getCurrentBalance = async ({ rpc, coinAddress, accAddress }: { rpc: string | undefined , coinAddress?: string, accAddress?: string }): Promise<bigint> => {
    const provider = new ethers.JsonRpcProvider(rpc);
    
    if (coinAddress) {
        const contract = new ethers.Contract(coinAddress, erc20ABI, provider);
        const rawBalance = await contract.balanceOf(accAddress);
        return BigInt(rawBalance.toString()); 
    }

    const rawBalance = await provider.getBalance(accAddress || "0x00");
    return BigInt(rawBalance.toString());
}

export default getCurrentBalance;