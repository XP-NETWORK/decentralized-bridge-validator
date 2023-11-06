import { multiversXContractListener } from "@src/modules/validator/utils";
import { IMultiversXLockListener } from "./types";
import { getMultiversXLockListenerHandler } from "./utils";

const multiversXLockListener = async ({ config, wallets, multiversXChainConfig }: IMultiversXLockListener) => {

    const { gatewayURL, contractAddress, lastBlock: lastBlock_ } = multiversXChainConfig;
    const handleLog = getMultiversXLockListenerHandler({ config, wallets, multiversXChainConfig })
    await multiversXContractListener({ gatewayURL, contractAddress, eventIdentifier: "lock", handleLog, jobName: "multiversXLockedEventListener", lastBlock_ })

}

export default multiversXLockListener