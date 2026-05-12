import { Request, Response } from "express";
import client from "prom-client";

export const getMetrics = async (req: Request, res: Response) => {
  res.set("Content-Type", client.register.contentType);
  res.send(await client.register.metrics());
};
