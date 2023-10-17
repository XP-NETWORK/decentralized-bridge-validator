import { IChainSpecs } from "../../../../../config/types"
import { listener } from "../../../utils"
import { LogEntry } from "../../../utils/evm/listener/types";

const stakingListener = (config: IChainSpecs) => {

    const contractAddress = config.stakingConfig.contractAddress;
    const rpcUrl = config.stakingConfig.rpc
    const lastBlock_ = config.stakingConfig.lastBlock
    const chain = config.stakingConfig.chain
    const handleLog = async ({ log }: { log: LogEntry; }) => {
        // Handle Logs
    }

    listener({ contractAddress, rpcUrl, lastBlock_, chain, handleLog })
}

export default stakingListener