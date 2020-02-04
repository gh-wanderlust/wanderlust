import { NextApiRequest, NextApiResponse } from 'next';
import { Trip } from '../../../server/db/models';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const trips = await Trip.findAll();
    res.json(trips);
  }

  if (req.method === 'POST') {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  }
};
