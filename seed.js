const db = require('./server/db');
const {User, Listing, Trip} = require('./server/db/models');

const seed = async () => {
    await db.sync({force: true})
}

seed().catch((err) => {
    db.close();
    console.log(`ERROR SEEDING: ${err.message} ${err.stack}`)
})