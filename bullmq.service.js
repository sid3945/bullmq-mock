import { Queue, Worker } from 'bullmq';
import { getRedisConnection } from './redis.helper.js';

export async function createQueue(queueName){
    const redis = await getRedisConnection();
    const queue = new Queue(queueName, {connection: {
        ...redis.options, 
        maxRetriesPerRequest: null
    }
});
    return queue;
}

export async function addJobs(queueName, jobName, data){
    await queueName.add(jobName, data, {
        attempts: 3,
        backoff: {
            type: 'fixed',
            delay: 1000
        }
    })
}

export async function processJobs(queueName, handler){
    const redis = await getRedisConnection();
    const worker = new Worker(queueName, handler, {connection: {
        ...redis.options, 
        maxRetriesPerRequest: null
    }});
    worker.on('completed', (job)=>{
        console.log(`Job ${job.id} successfully completed.`);
    });
    worker.on('failed',(job, err)=>{
        console.error(`Job ${job.id} failed with error: ${err.message}`);
    })
}