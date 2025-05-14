const { Worker } = require('bullmq');
const fs = require('fs');
const models = require('../database/models');
const Redis = require('ioredis');

const connection = new Redis({
    maxRetriesPerRequest: null
});

const worker = new Worker('fileQueue', async job => {
    const { fileId, filePath } = job.data;

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Read file data
        const fileText = fs.readFileSync(filePath, 'utf-8');

        // Update DB
        models.file.update(
            {
                status: 'processed',
                extracted_data: fileText
            },
            { where: { id: fileId } },
        );
    } catch (error) {
        models.file.update(
            {
                status: 'failed',
                extracted_data: error,
            },
            { where: { id: fileId } },
        );
    }
}, { connection });

module.exports = worker;
