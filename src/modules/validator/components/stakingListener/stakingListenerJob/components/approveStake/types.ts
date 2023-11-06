import { BridgeStorage } from "@src/contractsTypes";
import { IGeneratedWallets } from "@src/types";

interface IApproveStake {
    wallets: IGeneratedWallets;
    stakerAddress: string;
    storageContract: BridgeStorage;
    otherChains: { validatorAddress: string, chainSymbol: string }[]
}

export { IApproveStake }