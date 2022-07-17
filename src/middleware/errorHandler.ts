import { Request, Response } from "express";

export const errorHandler = (error: Error, req: Request, res: Response) => {
  res.sendStatus(500);
};
