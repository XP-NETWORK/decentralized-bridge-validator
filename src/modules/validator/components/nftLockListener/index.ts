import { IConfigAndWallets } from "@src/types"
import { createJobWithWorker } from "../../utils"
import { evmLockListener, multiversXLockListener, tonLockListener } from "./components"
import { IEvmLockListener, ITonLockListener } from "./types";

const nftLockListener = async ({ config, wallets }: IConfigAndWallets) => {

    for (const chainConfig of config.bridgeChains) {
        if (chainConfig.chainType === 'evm') {
            const jobData: IEvmLockListener = { evmChainConfig: chainConfig, config, wallets };
            const jobName: string = `evmLockedEventListener_${chainConfig.chain}`
            await createJobWithWorker<IEvmLockListener>({ jobData, jobName, jobFunction: evmLockListener })
        } else if (chainConfig.chainType === "multiversX") {
            await multiversXLockListener({ config, wallets, multiversXChainConfig: chainConfig })
        } else if (chainConfig.chainType === 'ton') {
            const jobData: ITonLockListener = { tonChainConfig: chainConfig, config, wallets };
            const jobName: string = `tonLockedEventListener_${chainConfig.chain}`
            await createJobWithWorker<ITonLockListener>({ jobData, jobName, jobFunction: tonLockListener })
        }
    }
}


export default nftLockListener