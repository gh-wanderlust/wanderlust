const Sequelize = require('sequelize');
const db = require('../database');

const Listing = db.define('listing', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    city: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    country: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    minOccupants: {
        type: Sequelize.INTEGER,
    },
    maxOccupants: {
        type: Sequelize.INTEGER,
    },
    ownerPhotos: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
})

module.exports = Listing;