import { nftLockListener, stakingListener } from "./components"

const runValidators = async ({ config, wallets }: IConfigAndWallets) => {
    const jobData = {
        config,
        wallets
    };
    await stakingListener(jobData);
    await nftLockListener(jobData);
}

export { runValidators }
