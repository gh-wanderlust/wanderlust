const Sequelize = require('sequelize');
const db = require('../database');

const Trip = db.define('trip', {
    dateFrom: {
        type: Sequelize.DATEONLY,
    },
    dateTo: {
        type: Sequelize.DATEONLY,
    }
})

module.exports = Trip;