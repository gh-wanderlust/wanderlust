const { User } = require('../../server/db/models');

export default async (req: any, res: any) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        if (user.correctPassword(password)) {
          res.status(200).send({ token: user.id });
        } else {
          res.setHeader('Content-Type', 'text/plain');
          res.status(200).send('Incorrect password');
        }
      } else {
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send('No such account found');
      }
    } catch (error) {
      console.error(error);
    }
  }
};
