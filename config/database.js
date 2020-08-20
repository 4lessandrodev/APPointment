const path = require('path');
require('dotenv').config();
module.exports = {

    username: 'lneaoteneampda' || process.env.DB_USER,
    password: '716ecbb35525eaa01fbee2185b3ac7a7a4fe88a81e1a7d2f0f8bb90ed6f00ed3' || process.env.DB_PASS,
    database: 'dcpt506c6bg2hp' || process.env.DB_NAME,
    host: 'ec2-34-198-243-120.compute-1.amazonaws.com' || process.env.HOST,
    dialect: 'postgres' || process.env.DIALECT
    
};