const { status: { INTERNAL_SERVER_ERROR } } = require('http-status');
const authServices = require('../services/auth.service');

class AuthController {
    static async register(req, res) {
        try {
            const { body } = req;
            const response = await authServices.register(body);
            return res.status(response.code).send(response);
        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR).send({ error });
        }
    }

    static async login(req, res) {
        try {
            const { body } = req;
            const response = await authServices.login(body);
            return res.status(response.code).send(response);
        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR).send({ error });
        }
    }
}

module.exports = AuthController;
