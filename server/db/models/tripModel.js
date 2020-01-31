const Sequelize = require('sequelize');
const db = require('../database');

const Trip = db.define('trip', {
    dateFrom: {
        type: Sequelize.INTEGER,
    },
    dateTo: {
        type: Sequelize.INTEGER,
    }
})

module.exports = Trip;