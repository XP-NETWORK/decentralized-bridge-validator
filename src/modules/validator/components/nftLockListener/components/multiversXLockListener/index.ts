import { multiversXContractListener } from "@src/modules/validator/utils";
import { IMultiversXLockListener } from "./types";

const multiversXLockListener = async ({ config, wallets, multiversXChainConfig }: IMultiversXLockListener) => {

    const { elasticSearchURL, contractAddress, lastBlock: lastBlock_ } = multiversXChainConfig;
    
    await multiversXContractListener({ elasticSearchURL, contractAddress, eventIdentifier: ["lock721", "lock1155"], multiversXChainConfig, config, wallets, jobName: "multiversXLockedEventListener", lastBlock_ })

}

export default multiversXLockListener