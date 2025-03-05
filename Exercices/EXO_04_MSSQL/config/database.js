const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DB_DIALECT, DB_SERVER_NAME } = process.env;



module.exports = {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    dialect: DB_DIALECT,
    options: {
        trustServerCertificate: true,
    },
};

