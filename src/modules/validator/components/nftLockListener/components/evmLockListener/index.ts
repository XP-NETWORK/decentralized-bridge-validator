import { evmContractListener } from "@src/modules/validator/utils";
import { handleLockEventLog } from "./utils";
import { IEvmLockListener } from "../../types";


const evmLockListener = async ({ config, evmChainConfig, wallets }: IEvmLockListener) => {

    const { contractAddress, rpcURL, lastBlock: lastBlock_, chain } = evmChainConfig;


    const handleLog = handleLockEventLog({ config, evmChainConfig, wallets })

    try {
        await evmContractListener({ contractAddress, rpcURL, lastBlock_, chain, handleLog });
    } catch (e) {
        console.error("Error in evmLockListener", e)
    }
}




export default evmLockListener;
