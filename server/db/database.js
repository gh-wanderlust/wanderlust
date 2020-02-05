const Sequelize = require('sequelize');
const pkg = require('../../package.json');
const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

// if deploying via heroku, add "process.env.DATABASE_URL" to the Sequelize instance
const db = new Sequelize(`postgres://localhost:5432/${databaseName}`, {
  logging: false,
});

// const Sequelize = require('sequelize')
// require('dotenv').config()



// const db = new Sequelize(
//         'postgres',
//         process.env.SQL_GHP_WANDERLUST_USERNAME,
//         process.env.SQL_GHP_WANDERLUST_PASSWORD,
//         {

//             // this is the IP address
//           host: process.env.SQL_GHP_WANDERLUST_IP,
//           dialect: 'postgres',

//         },
//       );

module.exports = db;
