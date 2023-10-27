import { IConfigAndWallets, IEvmChainConfig } from "@src/types"
import { createJobWithWorker } from "../../utils"
import { evmLockListener } from "./components"
import { IEvmLockListener } from "./types";

const nftLockListener = async ({ config, wallets }: IConfigAndWallets) => {

    for (const chainConfig of config.bridgeChains) {
        if (chainConfig.chainType === 'evm') {
            const jobData: IEvmLockListener = { evmChainConfig: chainConfig as IEvmChainConfig, config, wallets };

            const jobName: string = `evmLockedEventListener_${chainConfig.chain}`
            await createJobWithWorker<IEvmLockListener>({ jobData, jobName, jobFunction: evmLockListener })
        }
    }
}


export default nftLockListener