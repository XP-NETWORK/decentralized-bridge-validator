import { IStakingConfig } from "../../../../config/types";

interface IStakeTokens {
    stakingConfig: IStakingConfig;
    privateKey: string | undefined
}

export { IStakeTokens }