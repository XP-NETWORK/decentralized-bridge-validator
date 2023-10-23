import { IChainConfig } from "../../../../../config/types";
import { IEvmWallet } from "../../../types";

interface IHandleEvmValidatorAddition {
    storageChainConfig: IChainConfig;
    evmChainConfig: IChainConfig;
    evmWallet: IEvmWallet;
}

export { IHandleEvmValidatorAddition }