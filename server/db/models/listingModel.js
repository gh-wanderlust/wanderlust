const Sequelize = require('sequelize');
const db = require('../database');

const Listing = db.define('listing', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  city: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  country: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  minOccupants: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  maxOccupants: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ownerPhotos: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports = Listing;
