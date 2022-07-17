import { NextFunction, Request, Response } from "express";
import { logger } from "../logging/winstonLogger";

export const unhandledErrorLogger = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`${req.method} ${req.url} ${error.message}`);
  next(error);
};
