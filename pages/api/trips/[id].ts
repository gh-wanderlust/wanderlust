const { Trip, User, Listing } = require('../../../server/db/models');

export default async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const {
        query: { id, users, listings },
      } = req;

      const include = [];
      if (users === 'true') include.push({model:User})
      if (listings === 'true') include.push({model: Listing})

      const options = {include}
      const trip = await Trip.findByPk(id, options);
      res.json(trip);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }

  if (req.method === 'DELETE') {
    try {
      const {
        query: { id },
      } = req;

      await Trip.destroy({ where: { id } });
      res.status(204).end();
    } catch (error) {
      console.error(error);
    }
  }

  if (req.method === 'PUT') {
    try {
      const {
        query: { id },
      } = req;

      const [_, trips] = await Trip.update(req.body, {
        where: { id },
        returning: true,
      });
      res.status(200).send(trips[0]);
    } catch (error) {
      console.error(error);
    }
  }
};
