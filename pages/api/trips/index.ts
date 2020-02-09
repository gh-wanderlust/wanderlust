const { Trip, User } = require('../../../server/db/models');
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
        const options = include === 'users' ? { include: { model: User } } : {};

        const trips = await Trip.findAll(options);
        res.json(trips);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (req.method === 'POST') {
    try {
      const [trip] = await Trip.findOrCreate({ where: req.body });
      if (req.query.userId) {
        await trip.addUser(parseInt(req.query.userId));
      }
      res.status(201).json(trip);
    } catch (error) {
      console.error(error);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { userId, listingId } = req.query;
      const trips = await Trip.findAll({
        where: { listingId, status: 'pending' },
      });

      trips.forEach(async (trip: any) => {
        if (trip.hasUser(userId)) {
          await trip.removeUser(userId);
          if (trip.getUsers().length === 0) await trip.destroy();
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
  });

  for (const trip of trips) {
    const hasUser = await trip.hasUser(userId);
    console.log('hasUser:', hasUser);
    if (hasUser) {
      return trip;
    }
  }

  return {};
};
