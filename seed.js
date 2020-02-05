const db = require('./server/db');
const { User, Listing, Trip } = require('./server/db/models');
const listingSeed = require('./listingSeedData');

const seed = async () => {
  await db.sync({ force: true });
  console.log('DB synced!');


  const addListings = []
  listingSeed.forEach(listing => {
    addListings.push(Listing.create(listing))
  })
  const listings = await Promise.all(addListings)

  const users = await Promise.all([
    User.create({
      firstName: 'Sophie',
      lastName: 'Hatter',
      email: 'sophie@hatter.com',
      password: 'howl123',
      imageUrl:
        'https://i.pinimg.com/originals/a8/10/7a/a8107a0f1afa49f51f11566843830a55.jpg',
    }),
    User.create({
      firstName: 'William',
      lastName: 'Wallace',
      email: 'toFreedom@scotland.com',
      password: 'huzzah',
      imageUrl:
        'https://www.britain-magazine.com/wp-content/uploads/William-Wallace.jpg',
    }),
    User.create({
      firstName: 'Dwayne The Rock',
      lastName: 'Johnson',
      email: 'yourWelcome@moana.com',
      password: 'doYouSmellWhatTheRockIsCooking',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/f/f1/Dwayne_Johnson_2%2C_2013.jpg',
    }),
  ]);

  const trips = await Promise.all([
    Trip.create({
      dateFrom: new Date(2020, 2, 24),
      dateTo: new Date(2020, 2, 27),
      status: 'booked',
    }),
    Trip.create({
      dateFrom: new Date(2021, 3, 25),
      dateTo: new Date(2021, 4, 5),
      status: 'pending',
    }),
  ]);

  await Promise.all([
    users[0].addListing([listings[0], listings[1]]),
    users[1].addListing(listings[0]),
    users[2].addListing([listings[0], listings[1], listings[2]]),
    trips[1].addUser([users[0], users[2]]),
    trips[1].setListing(listings[1]),
    trips[0].addUser([users[0], users[1], users[2]]),
    trips[0].setListing(listings[0]),
  ]);

  console.log('DB seeded!');
};

const runSeed = async function() {
  try {
    await seed();
  } catch (err) {
    console.log(`ERROR SEEDING: ${err.message} ${err.stack}`);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
};

if (module === require.main) {
  runSeed();
}
