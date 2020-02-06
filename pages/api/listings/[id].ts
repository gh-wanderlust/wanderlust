const { Listing, Trip } = require('../../../server/db/models');

export default async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { query: { id } } = req;
      const listing = await Listing.findByPk(id);
      res.json(listing);
    } catch (err) {
      console.error(err);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const {
        query: { id },
      } = req;

      await Listing.destroy({ where: { id } });
      res.status(204).end();
    } catch (err) {
      console.error(err);
    }
  }
};
