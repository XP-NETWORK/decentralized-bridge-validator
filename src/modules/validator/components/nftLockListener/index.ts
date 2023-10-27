import { IBridgeConfig, IConfigAndWallets, IEvmChainConfig, IEvmWallet } from "@src/types"
import { createJobWithWorker } from "../../utils"
import { evmLockListener } from "./components"

const nftLockListener = async ({ config, wallets }: IConfigAndWallets) => {

    for (const chainConfig of config.bridgeChains) {
        if (chainConfig.chainType === 'evm') {
            const jobData: { evmChainConfig: IEvmChainConfig, config: IBridgeConfig, evmWallet: IEvmWallet } =
                { evmChainConfig: chainConfig as IEvmChainConfig, config, evmWallet: wallets.evmWallet };

            const jobName: string = `evmLockedEventListener_${chainConfig.chain}`
            await createJobWithWorker<{ evmChainConfig: IEvmChainConfig, config: IBridgeConfig, evmWallet: IEvmWallet }>
                ({ jobData, jobName, jobFunction: evmLockListener })
        }
    }
}


export default nftLockListener