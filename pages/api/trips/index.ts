const { Trip } = require('../../../server/db/models');

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
      const trip = await Trip.create(req.body);
      res.status(201).json(trip);
    } catch (error) {
      console.error(error);
    }
  }
};
