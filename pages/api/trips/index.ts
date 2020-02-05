const { Trip } = require("../db/models");

export default async (req: any, res: any) => {
  if (req.method === "GET") {
    const trips = await Trip.findAll();
    res.json(trips);
  }

  if (req.method === "POST") {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  }
};
