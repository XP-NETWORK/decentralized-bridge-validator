import { IBridgeConfig } from "../../../config/types";
import { IGeneratedWallets } from "../../setup/types";

interface IConfigAndWallets {
    config: IBridgeConfig;
    wallets: IGeneratedWallets;
}

export { IConfigAndWallets }