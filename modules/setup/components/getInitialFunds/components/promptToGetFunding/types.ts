import { IChain, IChainSpecs, IStakingConfig } from "../../../../../../config/types";
import { IGeneratedWallets } from "../../../../types";

interface IHandleEvmPromt {
    evmChainConfig: IChain | IStakingConfig;
    evmPublicAddress: string;
}

interface IPromptToGetFunding{
    wallets: IGeneratedWallets;
    config: IChainSpecs
}
export { IHandleEvmPromt , IPromptToGetFunding}