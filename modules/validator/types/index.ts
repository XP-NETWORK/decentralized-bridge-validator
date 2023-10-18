import { IChainSpecs } from "../../../config/types";
import { IGeneratedWallets } from "../../setup/types";

interface IStakingListener {
    config: IChainSpecs;
    wallets: IGeneratedWallets;
}

export { IStakingListener }