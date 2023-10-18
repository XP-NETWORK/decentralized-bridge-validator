import { stakingListener } from "./components"
import { IStakingListener } from "./types";

const runValidators = async ({ config, wallets }: IStakingListener) => {
    const jobData = {
        config,
        wallets
    };
    await stakingListener(jobData)
}

export { runValidators }
