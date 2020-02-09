const { Trip } = require('../../../server/db/models');
// import { Trip, User } from '../../../server/db/models/interfaces';

export default async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const trips = await Trip.findAll();
      res.json(trips);
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

      console.log(trips);
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
