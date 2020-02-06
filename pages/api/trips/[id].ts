const { Trip, User } = require('../../../server/db/models');

export default async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const {
        query: { id },
      } = req;
      const trip = await Trip.findByPk(id, {
        include: [{ model: User }],
      });
      res.json(trip);
    } catch (error) {
      console.error(error);
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
