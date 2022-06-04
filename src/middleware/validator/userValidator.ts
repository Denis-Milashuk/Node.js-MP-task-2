import Ajv from "ajv";
import { userSchema } from "../../model/UserSchema";
import { NextFunction, Request, Response } from "express";

const ajv = new Ajv();

const validate = ajv.compile(userSchema);

export const userValidator = (req: Request, res: Response, next: NextFunction) => {
  if (!validate(req.body)) return res.status(400).json(validate.errors);
  return next();
};
