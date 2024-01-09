import { evmContractListener } from "@src/modules/validator/utils";
import { getEvmLockListenerHandler } from "./utils";
import {  IHederaLockListener } from "../../types";


const hederaLockListener = async ({ config, hederaChainConfig, wallets }: IHederaLockListener) => {

    const { contractAddress, rpcURL, lastBlock: lastBlock_, chain } = hederaChainConfig;

    const handleLog = getEvmLockListenerHandler({ config, hederaChainConfig, wallets })

    try {
        await evmContractListener({ contractAddress, rpcURL, lastBlock_, chain, handleLog });
    } catch (e) {
        console.error("Error in evmLockListener", hederaChainConfig.chain, e)
    }
}




export default hederaLockListener;
