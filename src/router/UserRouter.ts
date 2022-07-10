import express, {Router} from "express";
import userService from "../service/UserService";
import {UserDto} from "../model/dto/UserDto";
import {userValidator} from "../middleware/userValidator";
import {UserEntity} from "../model/entity/UserEntity";
import {UserConverter} from "../utility/UserConverter";
import {UpdateResult} from "typeorm";

const router: Router = express.Router();

router.get("/:id", async (req, res) => {
  const user: UserEntity | null = await userService.getById(Number(req.params.id));

  if (!user) {
    res.sendStatus(404);
  } else {
    res.json(UserConverter.convertToDto(user));
  }
});

router.post("/", userValidator, async (req, res) => {
  const user: UserDto = req.body;
  await userService.create(UserConverter.convertToEntity(user));
  res.sendStatus(201);
});

router.put("/", userValidator, async (req, res) => {
  const updatedUser: UserDto = req.body;
  const updateResult: UpdateResult = await userService.update(UserConverter.convertToEntity(updatedUser));

  if (!updateResult.affected) {
    res.sendStatus(404);
  } else {
    res.send("Updated");
  }
});

router.get("/", async (req, res) => {
  const loginSubstring: string | undefined = req.query.loginSubstring as string | undefined;
  const limit: number | undefined = req.query.limit as number | undefined;

  console.log(`LoginSubstring: ${loginSubstring}; limit: ${limit}`);
  const users: UserEntity[] = await userService.getAutoSuggestUsers(loginSubstring, limit);

  if (users.length === 0) {
    res.sendStatus(404);
  } else {
    const userDtos: UserDto[] = users.map((user) => UserConverter.convertToDto(user));
    return res.json(userDtos);
  }
});

router.delete("/:id", async (req, res) => {
  const isDeleted: boolean = await userService.softDelete(Number(req.params.id));

  if (!isDeleted) {
    res.sendStatus(404);
  } else {
    res.send("Deleted");
  }
});

export default router;
