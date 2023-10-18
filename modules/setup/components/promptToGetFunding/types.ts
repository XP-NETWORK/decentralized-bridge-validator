import { IChain, IStakingConfig } from "../../../../config/types";

interface IHandleEvmPromt {
    chainConfig: IChain | IStakingConfig;
    evmPublicAddress: string;
    isNotFullyFunded: boolean
} 


export {IHandleEvmPromt}