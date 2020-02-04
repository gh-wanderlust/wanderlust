import { NextApiRequest, NextApiResponse } from 'next';
import { Listing } from '../../../server/db/models';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const {
      query: { id },
    } = req;
    const listing = await Listing.findByPk(id);
    res.json(listing);
  }

  if (req.method === 'DELETE') {
    const {
      query: { id },
    } = req;

    await Listing.destroy({ where: { id } });
    res.status(204).end();
  }
};
