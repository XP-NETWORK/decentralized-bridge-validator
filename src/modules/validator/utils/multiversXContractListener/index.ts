import createJobWithWorker from '../createJobWithWorker';
import { poolTxHashes, poolTxStatus, processLogs } from './components';
import { IPoolTxHashes, IPoolTxStatus, IProcessLogs } from './components/types';
import { IMultiversXContractListener } from './types';

const multiversXContractListener = async ({
    eventIdentifier,
    multiversXChainConfig,
    config,
    wallets,
    jobName,
}: IMultiversXContractListener) => {
    await createJobWithWorker<IPoolTxHashes>({
        jobData: {
            elasticSearchURL: multiversXChainConfig.elasticSearchURL,
            contractAddress: multiversXChainConfig.contractAddress,
            lastBlock_: multiversXChainConfig.lastBlock,
        },
        jobFunction: poolTxHashes,
        jobName: `${jobName}_poolTxHashes`,
    });

    await createJobWithWorker<IPoolTxStatus>({
        jobData: { elasticSearchURL: multiversXChainConfig.elasticSearchURL },
        jobFunction: poolTxStatus,
        jobName: `${jobName}_poolTxStatus`,
    });

    await createJobWithWorker<IProcessLogs>({
        jobData: {
            gatewayURL: multiversXChainConfig.gatewayURL,
            eventIdentifier,
            multiversXChainConfig,
            config,
            wallets,
        },
        jobFunction: processLogs,
        jobName: `${jobName}_processLogs`,
    });
};

export default multiversXContractListener;
