
const { Listing } = require("../../../server/db/models");

export default async (req: any, res: any) => {
  if (req.method === "GET") {

    const listings = await Listing.findAll();
    res.json(listings);
  }


  if (req.method === "POST") {

    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  }
};
