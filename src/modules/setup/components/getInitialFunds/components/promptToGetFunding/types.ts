import { IChainConfig, IBridgeConfig, IStakingConfig } from "../../../../../../config/types";
import { IGeneratedWallets } from "../../../../types";

interface IHandleEvmPromt {
    evmChainConfig: IChainConfig | IStakingConfig;
    evmPublicAddress: string;
}

interface IPromptToGetFunding {
    wallets: IGeneratedWallets;
    config: IBridgeConfig
}
export { IHandleEvmPromt, IPromptToGetFunding }