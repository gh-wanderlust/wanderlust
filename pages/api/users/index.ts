import { NextApiRequest, NextApiResponse } from "next";
import { User } from '../../../server/db/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case "GET":
      try {
        let users = await User.findAll()
        res.status(200).send(users)
      } catch (error) {
        console.error(error)
      }
      break
    case "POST":
      try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            imageUrl: req.body.imageUrl
        })
        res.status(201).send(newUser)
      } catch (error) {
        console.error(error)   
      }
      break
    default: 
      res.setHeader("Allow", ['GET', 'POST', "DELETE"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
};