const { Queue } = require('bullmq');
const Redis = require('ioredis');

const connection = new Redis({
    maxRetriesPerRequest: null
});

const fileQueue = new Queue('fileQueue', { connection });

module.exports = fileQueue;
