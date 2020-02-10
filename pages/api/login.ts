const { User } = require('../../server/db/models');

export default async (req: any, res: any) => {
  const { email, candidatePwd } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      if (user.correctPassword(candidatePwd)) {
        res.status(200).send({ token: user.id });
      } else {
        res.status(200).send('Incorrect password');
      }
    } else res.status(200).send('No such account found');
  } catch (error) {
    console.error(error);
  }
};
