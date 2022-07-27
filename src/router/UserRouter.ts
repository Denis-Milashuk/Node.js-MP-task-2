import express, { Router } from "express";
import userService from "../service/UserService";
import { UserDto } from "../model/dto/UserDto";
import { userValidator } from "../middleware/userValidator";
import { UserEntity } from "../model/entity/UserEntity";
import userConverter from "../utility/UserConverter";
import { UpdateResult } from "typeorm";
import customPassport from "../middleware/security/passportStrategies";

const userRouter: Router = express.Router();

userRouter.use(customPassport.authenticate("bearer", { session: false }));
userRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.sendStatus(400);
    }

    const user: UserEntity | null = await userService.getById(id);

    if (!user) {
      res.sendStatus(404);
    } else {
      res.json(userConverter.convertToDto(user));
    }
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", userValidator, async (req, res, next) => {
  try {
    const user: UserDto = req.body;
    await userService.create(userConverter.convertToEntity(user));
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/", userValidator, async (req, res, next) => {
  try {
    const user: UserEntity = userConverter.convertToEntity(req.body);
    const updateResult: UpdateResult = await userService.update(user);

    if (!updateResult.affected) {
      res.sendStatus(404);
    } else {
      res.send("Updated");
    }
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    const loginSubstring: string | undefined = req.query.loginSubstring as string | undefined;
    const limit: number | undefined = req.query.limit as number | undefined;
    const users: UserEntity[] = await userService.getAutoSuggestUsers(loginSubstring, limit);

    if (users.length === 0) {
      res.sendStatus(404);
    } else {
      const userDtos: UserDto[] = users.map((user) => userConverter.convertToDto(user));
      return res.json(userDtos);
    }
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.sendStatus(400);
    }

    const isDeleted: boolean = await userService.softDelete(id);

    if (!isDeleted) {
      res.sendStatus(404);
    } else {
      res.send("Deleted");
    }
  } catch (error) {
    next(error);
  }
});

export default userRouter;
