const { User } = require('../../../server/db/models');

export default async (req: any, res: any) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        let users = await User.findAll();
        res.status(200).send(users);
      } catch (error) {
        console.error(error);
      }
      break;
    case 'POST':
      try {
        console.log(req.body);
        const newUser = await User.create(req.body);
        console.log(newUser);
        res.status(201).send(newUser);
      } catch (error) {
        console.error(error);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
