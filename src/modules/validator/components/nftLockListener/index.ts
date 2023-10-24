import { createJobWithWorker } from "../../utils"
import { evmLockListener } from "./components"

const nftLockListener = async ({ config, wallets }: IConfigAndWallets) => {

    for (const chainConfig of config.bridgeChains) {
        if (chainConfig.chainType === "evm") {
            const jobData: IEvmChainConfigAndEvmWallet & IConfigAndWallets = { evmChainConfig: chainConfig, evmWallet: wallets.evmWallet, config, wallets }
            const jobName: string = `evmLockedEventListener_${chainConfig.chain}`
            await createJobWithWorker<IEvmChainConfigAndEvmWallet & IConfigAndWallets>({ jobData, jobName, jobFunction: evmLockListener })
        }
    }
}


export default nftLockListener