import Ajv from "ajv";
import { userSchema } from "../model/schema/UserSchema";
import { NextFunction, Request, Response } from "express";
import { groupSchema } from "../model/schema/GroupSchema";

const ajv = new Ajv();

const validateUser = ajv.compile(userSchema);
const validateGroup = ajv.compile(groupSchema);

export const userValidator = (req: Request, res: Response, next: NextFunction) => {
  if (!validateUser(req.body)) return res.status(400).json(validateUser.errors);
  return next();
};

export const groupValidator = (req: Request, res: Response, next: NextFunction) => {
  if (!validateGroup(req.body)) return res.status(400).json(validateGroup.errors);
  return next();
};
