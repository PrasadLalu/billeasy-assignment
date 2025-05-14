const { status: { INTERNAL_SERVER_ERROR } } = require('http-status');
const fileServices = require('../services/file.service');

class FileController {
    static async upload(req, res) {
        try {
            const response = await fileServices.upload(req);
            return res.status(response.code).send(response);
        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR).send({ error });
        }
    }

    static async findById(req, res) {
        try {
            const { id } = req.params;
            const response = await fileServices.findById(id);
            return res.status(response.code).send(response);
        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR).send({ error });
        }
    }
}

module.exports = FileController;
