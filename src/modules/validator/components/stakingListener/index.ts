import { createJobWithWorker } from '../../utils';
import { IConfigAndWallets } from '@src/types';
import stakingListenerJob from './stakingListenerJob';

const stakingListener = async (jobData: IConfigAndWallets) => {
    const jobName = 'stakingApprover';

    await createJobWithWorker<IConfigAndWallets>({
        jobData,
        jobName,
        jobFunction: stakingListenerJob,
    });
};

export default stakingListener;
