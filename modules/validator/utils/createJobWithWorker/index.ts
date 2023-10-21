import { Worker, Queue } from 'bullmq';
import { redisIOConnection } from '../../../../utils';


const createJobWithWorker = async <T>({ jobData, jobName, jobFunction }: { jobData: T, jobName: string, jobFunction: (data: T) => Promise<void> }) => {

    const bullQueue = new Queue(jobName, { connection: redisIOConnection });

    const worker = new Worker(jobName, async (job) => {
        const data : T = job.data; 
        await jobFunction(data);
    }, { connection: redisIOConnection });

    await bullQueue.add(`${jobName}Job`, jobData);

    worker.on('completed', async (job) => {
        await job.remove();
        await bullQueue.add(`${jobName}Job`, job.data);
    });

    worker.on('failed', async (job, err) => {
        await job.remove();
        await bullQueue.add(`${jobName}Job`, job.data);
    });
}


export default createJobWithWorker;
