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
          include: [{ model: Listing }, { model: Trip }]
        });
        res.json(user);
      } catch (error) {
        console.error(error);
      }
      break;
    case "DELETE":
      try {
        const id = req.query.id;
        const userToBeDeleted = await User.findByPk(id);
        await userToBeDeleted.destroy();
        res.status(201);
      } catch (error) {
        console.error(error);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
