const { User, Listing, Trip } = require("../../../server/db/models");

export default async (req: any, res: any) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id = req.query.id;
        let user = await User.findOne({
          where: {
            id: id
          },
          include: [{ model: Trip, include: { model: Listing }}]
        });
        res.json(user);
      } catch (error) {
        console.error(error);
      }
      break;
    case "DELETE":
      try {
        const {query: {id}} = req;

        await User.destroy({where: {id}});
        res.status(204).end();
      } catch (error) {
        console.error(error);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
