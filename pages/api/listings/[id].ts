// import { NextApiRequest, NextApiResponse } from 'next';
const { Listing } = require("../../../server/db/models");

export default async (req: any, res: any) => {
  if (req.method === "GET") {
    const {
      query: { id }
    } = req;
    const listing = await Listing.findByPk(id);
    res.json(listing);
  }

  if (req.method === "DELETE") {
    const {
      query: { id }
    } = req;

    await Listing.destroy({ where: { id } });
    res.status(204).end();
  }
};
