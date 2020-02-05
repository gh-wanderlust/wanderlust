const Sequelize = require('sequelize');
const pkg = require('../../package.json');
const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

// if deploying via heroku, add "process.env.DATABASE_URL" to the Sequelize instance
const db = new Sequelize(`postgres://localhost:5432/${databaseName}`, {
  logging: false,
});

module.exports = db;
