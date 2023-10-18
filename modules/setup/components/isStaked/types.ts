import { IStakingConfig } from "../../../../config/types";

interface IIsStaked {
    stakingConfig: IStakingConfig;
    privateKey: string | undefined
}

export {IIsStaked}