import { IChain, IChainSpecs, IStakingConfig } from "../../../../../../config/types";
import { IGeneratedWallets } from "../../../../types";

interface IHandleEvmPromt {
    chainConfig: IChain | IStakingConfig;
    evmPublicAddress: string;
    isNotFullyFunded: boolean
}

interface IPromptToGetFunding{
    wallets: IGeneratedWallets;
    config: IChainSpecs
}
export { IHandleEvmPromt , IPromptToGetFunding}