const { status: { OK, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } } = require('http-status');
const models = require('../database/models');
const fileQueue = require('../queues/fileProcessor');

const upload = async (req) => {
    const { title, description, user_id } = req.body;
    if (!req.file) {
        return { code: BAD_REQUEST, message: 'Please select file to upload' }
    }

    if (!req.file || !user_id || !title) {
        return { code: BAD_REQUEST, message: 'Invalid input' }
    }
    const { originalname, path } = req.file;

    const user = await models.user.findOne({ where: { id: user_id } });
    if (!user) {
        return { code: NOT_FOUND, message: 'User not found' }
    }

    // Save file data
    const newFile = await models.file.create({
        title,
        description,
        user_id,
        original_filename: originalname,
        storage_path: path,
    });

    // Adding file in a queue
    await fileQueue.add('process', {
        fileId: newFile.id,
        filePath: path
    });

    const data = {
        id: newFile.id,
        filename: originalname,
        status: newFile.status
    }

    return { code: OK, message: 'success', data };
}

const findById = async (id, userId) => {
    console.log()
    let file = await models.file.findOne({
        where: { id },
        include: [
            {
                model: models.user,
                as: 'user',
                attributes: ['id', 'email'],
            }
        ],
    });

    if (!file) {
        return { code: NOT_FOUND, message: 'File not found' };
    }

    if (file.user_id !== userId) {
        return { code: UNAUTHORIZED, message: 'You cannot access someone else uploaded file' };
    }
    return { code: OK, data: file };
}

module.exports = {
    upload,
    findById,
};
