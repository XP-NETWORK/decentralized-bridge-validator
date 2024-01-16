import { BridgeStorage } from '@src/contractsTypes';
import { IGeneratedWallets } from '@src/types';

type IApproveStake = {
    wallets: IGeneratedWallets;
    validatorAddressAndChainType: {
        validatorAddress: string;
        chainType: string;
    }[];
    storageContract: BridgeStorage;
};

export { IApproveStake };
