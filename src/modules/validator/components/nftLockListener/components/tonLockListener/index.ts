import { tonContractListener } from "@src/modules/validator/utils";
import { getTonLockListenerHandler } from "./utils";
import { ITonLockListener } from "../../types";


const tonLockListener = async ({ config, tonChainConfig, wallets }: ITonLockListener) => {

    const { contractAddress, rpcURL, lastBlock: lastBlock_, chain } = tonChainConfig;

    const handleLog = getTonLockListenerHandler({ config, tonChainConfig, wallets })

    try {
        await tonContractListener({ contractAddress, rpcURL, lastBlock_, chain, handleLog });
    } catch (e) {
        console.error("Error in tonLockListener", e)
    }
}




export default tonLockListener;
