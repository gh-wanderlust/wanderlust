const Sequelize = require('sequelize')

// if deploying via heroku, add "process.env.DATABASE_URL" to the Sequelize instance
const db = new Sequelize('postgres://localhost:5432/wanderlust', {
    logging: false
})

module.exports = db;