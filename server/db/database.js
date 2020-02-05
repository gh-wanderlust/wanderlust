const Sequelize = require('sequelize')
require('dotenv').config()

// if deploying via heroku, add "process.env.DATABASE_URL" to the Sequelize instance
const db = new Sequelize(process.env.DATABASE_URL , {
    logging: true
})

module.exports = db;
