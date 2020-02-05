const Sequelize = require('sequelize')
require('dotenv').config()

console.log('USERNAME' , process.env.SQL_GHP_WANDERLUST_USERNAME)

const db = new Sequelize(
        'postgres',
        process.env.SQL_GHP_WANDERLUST_USERNAME,
        process.env.SQL_GHP_WANDERLUST_PASSWORD,
        {

            // this is the IP address
          host: process.env.SQL_GHP_WANDERLUST_IP,
          dialect: 'postgres',

        },
      );
module.exports = db;
