import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { UserEntity } from "../model/entity/UserEntity";
import customPassport from "../middleware/security/passportStrategies";

const authenticateRouter: Router = express.Router();

authenticateRouter.use(customPassport.authenticate("local", { session: false }));
authenticateRouter.post("/", (req, res) => {
  const user = req.user as UserEntity;
  const payLoad = { userId: user.id, login: user.login };
  const token = jwt.sign(payLoad, process.env.JWT_SECRET || "secret", { expiresIn: 5 * 60 });

  res.json({ TOKEN: token });
});

export default authenticateRouter;
