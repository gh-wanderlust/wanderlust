const Sequelize = require('sequelize');
const db = require('../database');

const Trip = db.define('trip', {
  dateFrom: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  dateTo: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('pending', 'booked'),
    allowNull: false,
  },
});

module.exports = Trip;
