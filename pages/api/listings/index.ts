const { Listing, User, Trip } = require('../../../server/db/models');

export default async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const listings = await Listing.findAll({
          include: [{model: User}, {model: Trip}]
      });
      res.json(listings);
    } catch (err) {
      console.error(err);
    }
  }

  if (req.method === 'POST') {
    try {
      const listing = await Listing.create(req.body);
      res.status(201).json(listing);
    } catch (err) {
      console.error(err);
    }
  }
};
