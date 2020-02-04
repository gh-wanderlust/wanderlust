const Sequelize = require('sequelize');
const db = require('../database');

const Trip = db.define('trip', {
  dateFrom: {
    type: Sequelize.DATEONLY,
  },
  dateTo: {
    type: Sequelize.DATEONLY,
  },
  status: {
    type: Sequelize.ENUM('pending', 'booked'),
  },
});

module.exports = Trip;
