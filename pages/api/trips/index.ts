const { Trip, User, Listing } = require('../../../server/db/models');
// import { Trip, User } from '../../../server/db/models/interfaces';

export default async (req: any, res: any) => {
  if (req.method === 'GET') {
    const { userId, listingId } = req.query;

    try {
      if (userId) {
        const trip = await findTrip(parseInt(userId), listingId);
        res.json(trip);
      } else {
        const { include } = req.query;
        const options =
          include === 'users' ? { include: [{ model: User }] } : {};

        const trips = await Trip.findAll(options);
        res.json(trips);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (req.method === 'POST') {
    const { userIds, trip } = req.body;

    try {
      const [tripInstance] = await Trip.findOrCreate({ where: trip });
      if (userIds) {
        await Promise.all(
          userIds.map((id: number) => {
            return tripInstance.addUser(id);
          })
        );
      }
      res.status(201).json(tripInstance);
    } catch (error) {
      console.error(error);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { userId, listingId } = req.body;
      const trips = await Trip.findAll({
        where: { listingId, status: 'pending' },
      });

      trips.forEach(async (trip: any) => {
        if (trip.hasUser(userId)) {
          await trip.removeUser(userId);

          const users = await trip.getUsers();
          if (users.length === 0) await trip.destroy();
        }
      });

      res.status(204).end();
    } catch (error) {
      console.error(error);
    }
  }
};

/** HELPERS **/

const findTrip = async (userId: number, listingId: number) => {
  const trips = await Trip.findAll({
    where: { listingId, status: 'pending' },
    include: [{ model: User }, { model: Listing }],
  });

  for (const trip of trips) {
    const hasUser = await trip.hasUser(userId);
    if (hasUser) {
      return trip;
    }
  }

  return {};
};
