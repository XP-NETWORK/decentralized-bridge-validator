import createJobWithWorker from "../createJobWithWorker";
import { poolTxHashes, poolTxStatus, processLogs } from "./components"
import { IPoolTxHashes, IPoolTxStatus, IProcessLogs } from "./components/types";
import { IMultiversXContractListener } from "./types";

const multiversXContractListener = async ({ gatewayURL, contractAddress, lastBlock_, eventIdentifier, handleLog, jobName }: IMultiversXContractListener) => {

    await createJobWithWorker<IPoolTxHashes>({
        jobData: { gatewayURL, contractAddress, lastBlock_ },
        jobFunction: poolTxHashes,
        jobName: `${jobName}_poolTxHashes`
    });


    await createJobWithWorker<IPoolTxStatus>({
        jobData: { gatewayURL },
        jobFunction: poolTxStatus,
        jobName: `${jobName}_poolTxStatus`
    });


    await createJobWithWorker<IProcessLogs>({
        jobData: { gatewayURL, eventIdentifier, handleLog },
        jobFunction: processLogs,
        jobName: `${jobName}_processLogs`
    });
    
}

export default multiversXContractListener