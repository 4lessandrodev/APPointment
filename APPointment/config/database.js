const path = require('path');
require('dotenv').config();
module.exports = {

    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: path.join('C:','Program Files','PostgreSQL','10','data'),
    dialect: process.env.DIALECT
    
};