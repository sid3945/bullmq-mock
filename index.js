import { createQueue, addJobs, processJobs } from './bullmq.service.js';

const mockQueue = await createQueue('mockQueue');
console.log("=== mockQueue created ===", mockQueue.name);

processJobs(mockQueue.name, async (job)=>{
    console.log(`Processing job ${job.id} with data:, job.data`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`Job ${job.id} completed`);
})

setTimeout(()=>{
    const randomNumber = Math.floor(Math.random() * 100);
    console.log(`Adding a job with number ${randomNumber} from the queue ${mockQueue.name}`);

    addJobs(mockQueue, "consoleJob", { value: randomNumber }).then(()=>{
        console.log(`Job added successfully`);
    }).catch((err)=>{
        console.error(`Error adding job: ${err}`);
    });
}, 1000);