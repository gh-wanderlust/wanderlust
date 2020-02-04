import { NextApiRequest, NextApiResponse } from "next";
import User from "../../server/db/models/userModel"

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send({ name: "He do be looking kinda John doe!!!" });
  }

  if (req.method === "POST") {
    // const createUser = async () => {
    //   const newUser = await User.create({
    //     firstName: "Pablo",
    //     lastName: "Barrientos",
    //     email: "pablobarrientos@email.com",
    //     password: "password",
    //     imageUrl: "pablo.png"
    //   })
    //   return newUser
    // }
    // let user = createUser()
    // res.send(user)

    User.create({
        firstName: "Pablo",
        lastName: "Barrientos",
        email: "pablobarrientos@email.com",
        password: "password",
        imageUrl: "pablo.png"
      }).then(user => {
        console.log(user)
      })

    res.end(JSON.stringify({ "hello": "hey" }));
  }
};
