import { Worker, Queue } from 'bullmq';
import { redisIOConnection } from '../../../../utils';
import { processDelayMilliseconds } from '../../../../utils/constants/processDelayMilliseconds';


const createJobWithWorker = async <T>({ jobData, jobName, jobFunction }: { jobData: T, jobName: string, jobFunction: (data: T) => Promise<void> }) => {

    const bullQueue = new Queue(jobName, { connection: redisIOConnection });

    const worker = new Worker(jobName, async (job) => {
        const data: T = job.data;
        await jobFunction(data);
    }, { connection: redisIOConnection });

    await bullQueue.add(`${jobName}Job`, jobData, {
        removeOnComplete: true,
        removeOnFail: true,
        delay: processDelayMilliseconds
    });

    worker.on('completed', async (job) => {
        await bullQueue.add(`${jobName}Job`, job.data, {
            removeOnComplete: true,
            removeOnFail: true,
            delay: processDelayMilliseconds
        });
    });

    worker.on('failed', async (job, err) => {

        console.log({err})

        await bullQueue.add(`${jobName}Job`, job.data, {
            removeOnComplete: true,
            removeOnFail: true,
            delay: processDelayMilliseconds
        });
    });
}


export default createJobWithWorker;
