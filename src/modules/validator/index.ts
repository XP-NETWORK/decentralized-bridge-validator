import { nftLockListener, stakingListener } from "./components"
import { IConfigAndWallets } from "./types";

const runValidators = async ({ config, wallets }: IConfigAndWallets) => {
    const jobData = {
        config,
        wallets
    };
    await stakingListener(jobData);
    await nftLockListener(jobData);
}

export { runValidators }
