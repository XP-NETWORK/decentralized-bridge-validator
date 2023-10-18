import { IChainSpecs } from "../../config/types"
import { IGeneratedWallets } from "../setup/types";
import { stakingListener } from "./components"

const runValidators = async ({ config, secrets }: { config: IChainSpecs, secrets: IGeneratedWallets }) => {
    const jobData = {
        config,
        secrets
    };
    await stakingListener(jobData)
}

export { runValidators }
