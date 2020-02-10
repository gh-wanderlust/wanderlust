const { Listing, Trip, User } = require('../../../server/db/models');

export default async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const {
        query: { id, include },
      } = req;

      let options: object = {};
      if ( include ) {
        options = { include: [{ model: Trip, include: { model: User } }] };
      }
      const listing = await Listing.findByPk(id, options);
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
