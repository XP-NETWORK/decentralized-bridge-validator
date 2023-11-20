import createJobWithWorker from "../createJobWithWorker";
import { poolTxHashes, poolTxStatus, processLogs } from "./components"
import { IPoolTxHashes, IPoolTxStatus, IProcessLogs } from "./components/types";
import { IMultiversXContractListener } from "./types";

const multiversXContractListener = async ({ elasticSearchURL, contractAddress, lastBlock_, eventIdentifier, handleLog, jobName }: IMultiversXContractListener) => {

    await createJobWithWorker<IPoolTxHashes>({
        jobData: { elasticSearchURL, contractAddress, lastBlock_ },
        jobFunction: poolTxHashes,
        jobName: `${jobName}_poolTxHashes`
    });


    await createJobWithWorker<IPoolTxStatus>({
        jobData: { elasticSearchURL },
        jobFunction: poolTxStatus,
        jobName: `${jobName}_poolTxStatus`
    });


    await createJobWithWorker<IProcessLogs>({
        jobData: { elasticSearchURL, eventIdentifier, handleLog },
        jobFunction: processLogs,
        jobName: `${jobName}_processLogs`
    });
    
}

export default multiversXContractListener