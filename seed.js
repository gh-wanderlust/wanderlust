const db = require('./server/db');
const { User, Listing, Trip } = require('./server/db/models');

const seed = async () => {
  await db.sync({ force: true });
  console.log('DB synced!');

  const listings = await Promise.all([
    Listing.create({
      name: 'Peaceful Log Cabin in the Woods',
      description:
        'This log cabin is set in the woods in a rural part of northeastern Vermont. Escape the hustle and bustle, clear your mind, and enjoy nature. A great place to get some fresh air or to stay in and take a nap. Beautiful summers for easy hikes and refreshing swims in the lakes of our local Groton State Forest, unbelievable foliage to view from small dirt roads, and tons of outdoor winter activities. Great for a couples getaway, friends weekend, or some quality time with the kids. Pets welcome, too!',
      address: '888 Loch Ness Way',
      city: 'Inverness',
      country: 'Scotland',
      minOccupants: 4,
      maxOccupants: 8,
      ownerPhotos: [
        'https://roadesque.com/assets/a-peaceful-cabin-in-the-canadian-woods-at-logden-lodge/logdenLodge-2.jpg',
        'https://i.pinimg.com/originals/51/5e/8e/515e8e2f8de4ce6b42f6aaebbf923543.jpg',
        'https://www.impressiveinteriordesign.com/wp-content/uploads/2012/10/Cabin-Design-Ideas-For-Inspiration-7.jpg',
      ],
    }),
    Listing.create({
      name: "Howl's Moving Castle",
      description: 'Charming castle on the move with charming prince!',
      address: '1986 Wynne Jones Road',
      city: 'Osaka',
      country: 'Japan',
      minOccupants: 3,
      maxOccupants: 6,
      ownerPhotos: [
        'https://i.imgur.com/bMpCKQ3.jpeg',
        'https://i.imgur.com/d8zr5a9.jpeg',
        'https://img.buzzfeed.com/buzzfeed-static/static/2015-07/15/17/enhanced/webdr05/original-9377-1436995231-3.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto',
      ],
    }),
    Listing.create({
      name: 'Bungalow over water',
      description: 'Beautiful bungalow for your next getaway!',
      address: '123 Hakuna Matata Road',
      city: 'Bora Bora',
      country: 'French Polynesia',
      minOccupants: 3,
      maxOccupants: 6,
      ownerPhotos: [
        'https://www.jetsetter.com/uploads/sites/7/2018/09/tgBIPKMb-1380x690.jpeg',
        'https://i.pinimg.com/originals/eb/db/dd/ebdbdd76d7ed4b55cd4dae8702b8bded.jpg',
        'https://www.jetsetter.com/uploads/sites/7/2018/04/bath-hotels-island-luxury-960x960.jpeg',
        'https://www.fourseasons.com/alt/img-opt/~70.1530/publish/content/dam/fourseasons/images/web/BOR/BOR_130_aspect16x9.jpg',
      ],
    }),
  ]);

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
