import express, { Router } from "express";
import userRepository from "../repository/UserRepository";
import { User } from "../model/User";
import { userValidator } from "../middleware/validator/userValidator";

const router: Router = express.Router();

router.get("/:id", (req, res) => {
  const user: User | undefined = userRepository.getById(req.params.id);

  if (!user) res.sendStatus(404);

  res.json(user);
});

router.post("/", userValidator, (req, res) => {
  const user: User = req.body;
  userRepository.create(user);
  res.sendStatus(201);
});

router.put("/", userValidator, (req, res) => {
  const newUser: User = req.body;
  const oldUser: User | undefined = userRepository.getById(newUser.id);

  if (!oldUser) res.sendStatus(404);

  userRepository.update(newUser);
  res.send("Updated");
});

router.get("/", (req, res) => {
  const loginSubstring: string = req.query.loginSubstring as string;
  const limit: number = req.query.limit as unknown as number;

  res.json(userRepository.getAutoSuggestUsers(loginSubstring, limit));
});

router.delete("/:id", (req, res) => {
  const isDeleted = userRepository.softDelete(req.params.id);

  if (!isDeleted) res.sendStatus(404);

  res.send("Deleted");
});

export default router;
