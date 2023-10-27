import { IConfigAndWallets, IEvmChainConfigAndEvmWallet } from "@src/types";
import { evmContractListener } from "@src/modules/validator/utils";
import handleLockEventLog from "./utils/handleLockEventLog";


const evmLockListener = async ({ evmChainConfig, evmWallet, config }: IEvmChainConfigAndEvmWallet & IConfigAndWallets) => {

    const { contractAddress, rpcURL, lastBlock: lastBlock_, chain } = evmChainConfig;


    const handleLog = handleLockEventLog({ config, evmChainConfig, evmWallet })

    try {
        await evmContractListener({ contractAddress, rpcURL, lastBlock_, chain, handleLog });
    } catch (e) {
        console.error("Error Staking listner", e)
    }
}




export default evmLockListener;
