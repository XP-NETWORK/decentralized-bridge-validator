import { multiversXContractListener } from "@src/modules/validator/utils";
import { IMultiversXLockListener } from "./types";
import { getMultiversXLockListenerHandler } from "./utils";

const multiversXLockListener = async ({ config, wallets, multiversXChainConfig }: IMultiversXLockListener) => {

    const { elasticSearchURL, contractAddress, lastBlock: lastBlock_ } = multiversXChainConfig;
    const handleLog = getMultiversXLockListenerHandler({ config, wallets, multiversXChainConfig })
    await multiversXContractListener({ elasticSearchURL, contractAddress, eventIdentifier: "lock", handleLog, jobName: "multiversXLockedEventListener", lastBlock_ })

}

export default multiversXLockListener