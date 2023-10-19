import { IChain } from "../../../../../config/types";
import { IEvmWallet } from "../../../types";

interface IHandleEvmValidatorAddition {
    storageChainConfig: IChain;
    evmChainConfig: IChain;
    evmWallet: IEvmWallet;
}

export { IHandleEvmValidatorAddition }