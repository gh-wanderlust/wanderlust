const User = require('../models/userModel')
const Listing = require('../models/listingModel')
const Trip = require('../models/tripModel')

User.belongsToMany(Trip, {through: "UserTrip", foreignKey: "userId", otherKey: "tripId"})
Trip.belongsToMany(User, {through: "UserTrip", foreignKey: "tripId", otherKey: "userId"})
Listing.belongsToMany(User, {through: "UserListing", foreignKey: "listingId", otherKey: "userId"})
User.belongsToMany(Listing, {through: "UserListing", foreignKey: "userId", otherKey: "listingId"})

Trip.belongsTo(Listing, {foreignKey: "listingId"})
Listing.hasMany(Trip)

module.exports = {
    User,
    Listing,
    Trip
}