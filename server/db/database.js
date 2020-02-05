const Sequelize = require('sequelize');

const db = new Sequelize(
  'postgres',
  process.env.SQL_GHP_WANDERLUST_USERNAME,
  process.env.SQL_GHP_WANDERLUST_PASSWORD,
  {
    // this is the IP address
    host: process.env.SQL_GHP_WANDERLUST_IP,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = db;
