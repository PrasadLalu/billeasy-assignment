const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const comparePassword = (inputPWD, databasePWD) => {
    return bcrypt.compare(inputPWD, databasePWD);
}

const generateToken = (payload, secretKey = process.env.JWT_SECRET_KEY) => {
    return jwt.sign(payload, secretKey, {
        expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
    });
}

module.exports = {
    generateToken,
    encryptPassword,
    comparePassword,
};
