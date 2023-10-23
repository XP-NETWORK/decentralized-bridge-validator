import { IChainSpecs } from "../../../config/types";
import { IGeneratedWallets } from "../../setup/types";

interface IConfigAndWallets {
    config: IChainSpecs;
    wallets: IGeneratedWallets;
}

export { IConfigAndWallets }