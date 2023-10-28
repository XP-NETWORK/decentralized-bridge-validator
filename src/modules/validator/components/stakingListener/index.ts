import { createJobWithWorker, evmContractListener } from '../../utils';
import { IConfigAndWallets } from "@src/types";
import { getStakingListenerLogHandler } from "./utils/getStakingListenerLogHandler";

const stakingListener = async (jobData: IConfigAndWallets) => {
    const jobName = "stakingApprover";
    const jobFunction = async (data: IConfigAndWallets) => {
        const { config, wallets }: IConfigAndWallets = data;


        const handleLog = getStakingListenerLogHandler({ config, wallets })

        try {
            const { contractAddress, rpcURL, lastBlock: lastBlock_, chain } = config.stakingConfig;
            await evmContractListener({ contractAddress, rpcURL, lastBlock_, chain, handleLog });
        } catch (e) {
            console.error("Error Staking listner", e)
        }
    }


    await createJobWithWorker<IConfigAndWallets>({ jobData, jobName, jobFunction })
}


export default stakingListener;
