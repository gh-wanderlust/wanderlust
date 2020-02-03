import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send({ name: "He do be looking kinda John doe!!!" });
  }

  if (req.method === "POST") {
    console.log(req.body);
    res.end(JSON.stringify({ name: "POST MALONE" }));
  }
};
