const { status: { BAD_REQUEST, CREATED, CONFLICT, OK, UNAUTHORIZED } } = require('http-status');
const models = require('../database/models');
const { encryptPassword, comparePassword, generateToken } = require('../utils/common-methods');


const login = async (body) => {
    const { email, password } = body;
    if (!email || !password) {
        return { code: BAD_REQUEST, message: 'Invalid input' }
    }

    // check existing user
    const user = await findOne({ email });
    if (!user) {
        return { code: UNAUTHORIZED, message: 'User not registered yet.' }
    }

    // compare user password
    const isMatched = await comparePassword(password, user.password);
    if (!isMatched) {
        return { code: UNAUTHORIZED, message: 'Invalid user credentials' }
    }

    const token = generateToken({ id: user.id, email: user.email });
    return { code: OK, message: 'Login success', data: user, token };
}

const register = async (body) => {
    const { email, password } = body;
    if (!email || !password) {
        return { code: BAD_REQUEST, message: 'Invalid input' }
    }

    // checking existing user
    let user = await findOne({ email });
    if (user) {
        return { code: CONFLICT, message: 'User Already Registered' };
    }

    // encrypt password
    const encryptedPassword = encryptPassword(password);

    // creating new user
    user = await models.user.create({
        email,
        password: encryptedPassword,
    });
    return { code: CREATED, message: 'User Registered', data: user };
}

const findOne = async (query) => {
    return models.user.findOne({ where: query });
}

module.exports = {
    login,
    register,
}
