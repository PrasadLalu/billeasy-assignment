require('dotenv').config();
const { status: { INTERNAL_SERVER_ERROR, UNAUTHORIZED } } = require('http-status');
const jwt = require('jsonwebtoken');
const models = require('../database/models');

const authorized = async (req, res, next) => {
    try {
        let token = null;
        if (req.headers && req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(UNAUTHORIZED).send({ message: 'unauthorized' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await models.user.findOne({ where: { email: decoded.email } });
            if (!user) {
                return res.status(UNAUTHORIZED).send({ message: 'Unauthorized user.' });
            }
            req.loggedInUser = user;
            next();
        } catch (error) {
            return res.status(UNAUTHORIZED).send({ message: 'Token expired' });

        }
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ error });
    }
}

module.exports = authorized;
