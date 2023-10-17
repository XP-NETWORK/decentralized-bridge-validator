import { IChainSpecs } from "../../../../config/types"
import { stakingListener } from "../evm"

const runValidators = (config: IChainSpecs) => {
    stakingListener(config)
}

export default runValidators
