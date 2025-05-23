require('dotenv').config();

module.exports = {
    development: {
        username: process.env.PG_USER,
        password: process.env.PG_PWD,
        database: process.env.PG_DB,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: 'postgres',
        logging: false,
    },
    test: {
        username: process.env.PG_USER,
        password: process.env.PG_PWD,
        database: process.env.PG_DB,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: 'postgres',
        logging: false,
    },
    production: {
        username: process.env.PG_USER,
        password: process.env.PG_PWD,
        database: process.env.PG_DB,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: 'postgres',
        logging: false,
    },
};
