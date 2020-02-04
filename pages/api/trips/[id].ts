import { NextApiRequest, NextApiResponse } from 'next';
import { Trip, User } from '../../../server/db/models';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const {
      query: { id },
    } = req;
    const trip = await Trip.findByPk(id, {
      include: [{ model: User, attributes: ['id'] }],
    });
    res.json(trip);
  }

  if (req.method === 'DELETE') {
    const {
      query: { id },
    } = req;

    await Trip.destroy({ where: { id } });
    res.status(204).end();
  }

  if (req.method === 'PUT') {
    const {
      query: { id },
    } = req;

    const [_, trips] = await Trip.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(200).send(trips[0]);
  }
};
