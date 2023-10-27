import { IBridgeConfig, IEvmChainConfig, IEvmWallet } from "@src/types";
import { evmContractListener } from "@src/modules/validator/utils";
import { handleLockEventLog } from "./utils";


const evmLockListener = async ({ config, evmChainConfig, evmWallet }: { evmChainConfig: IEvmChainConfig, config: IBridgeConfig, evmWallet: IEvmWallet }) => {

    const { contractAddress, rpcURL, lastBlock: lastBlock_, chain } = evmChainConfig;


    const handleLog = handleLockEventLog({ config, evmChainConfig, evmWallet })

    try {
        await evmContractListener({ contractAddress, rpcURL, lastBlock_, chain, handleLog });
    } catch (e) {
        console.error("Error Staking listner", e)
    }
}




export default evmLockListener;
