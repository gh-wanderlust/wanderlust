const Sequelize = require('sequelize');
const db = require('../database');
const User = require('./userModel')

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
});

// Listing.prototype.getInterested = async (id) => {
//   const interestedUsers = await User.findAll()
//   return interestedUsers.length
// }

module.exports = Listing;
