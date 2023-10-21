import { Worker, Queue } from 'bullmq';
import { redisIOConnection } from '../../../../utils';


const createJobWithWorker = async <T>({ jobData, jobName, jobFunction }: { jobData: T, jobName: string, jobFunction: (data: T) => Promise<void> }) => {

    const bullQueue = new Queue(jobName, { connection: redisIOConnection });

    const worker = new Worker(jobName, async (job) => {
        const data: T = job.data;
        await jobFunction(data);
    }, { connection: redisIOConnection });

    await bullQueue.add(`${jobName}Job`, jobData, {
        removeOnComplete: true,  // Automatically remove when the job completes
        removeOnFail: true       // Automatically remove when the job fails
    });

    worker.on('completed', async (job) => {
        await bullQueue.add(`${jobName}Job`, job.data, {
            removeOnComplete: true,  // Automatically remove when the job completes
            removeOnFail: true       // Automatically remove when the job fails
        });
    });

    worker.on('failed', async (job, err) => {
        await bullQueue.add(`${jobName}Job`, job.data, {
            removeOnComplete: true,  // Automatically remove when the job completes
            removeOnFail: true       // Automatically remove when the job fails
        });
    });
}


export default createJobWithWorker;
