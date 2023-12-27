const dotenv = require('dotenv');

dotenv.config();

const config = Object.freeze({
    PORT: process.env.PORT,
    DB_USER: process.env.DBUSERNAME,
    DB_PASSWORD: process.env.DBPASSWORD,
    DB_HOST: process.env.DBHOST,
    DB_PORT: process.env.DBPORT,
    DB_NAME: process.env.DBNAME,
    ACCESSTOKEN_SECRET: process.env.ACCESSTOKEN_SECRET,
    SENDGRID_API: process.env.SENGRID_API,
    SENDER_EMAIL: process.env.SENDER_EMAIL
});

module.exports = config;