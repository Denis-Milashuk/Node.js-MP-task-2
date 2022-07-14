import express, { Router } from "express";
import { GroupEntity } from "../model/entity/GroupEntity";
import groupService from "../service/GroupService";
import { GroupDto } from "../model/dto/GroupDto";
import groupConverter from "../utility/GroupConverter";
import { groupValidator } from "../middleware/userValidator";
import { DeleteResult, UpdateResult } from "typeorm";

const groupRouter: Router = express.Router();

groupRouter.get("/", async (req, res) => {
  const groups: GroupEntity[] = await groupService.find();

  if (!groups) {
    res.sendStatus(404);
  } else {
    const groupDtos: GroupDto[] = groups.map((group) => groupConverter.convertToDto(group));
    res.json(groupDtos);
  }
});

groupRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.sendStatus(400);
  }

  const group: GroupEntity | null = await groupService.findById(id);

  if (!group) {
    res.sendStatus(404);
  } else {
    res.json(groupConverter.convertToDto(group));
  }
});

groupRouter.post("/", groupValidator, async (req, res) => {
  const group: GroupDto = req.body;
  await groupService.create(groupConverter.convertToEntity(group));
  res.sendStatus(201);
});

groupRouter.put("/", groupValidator, async (req, res) => {
  const group: GroupEntity = groupConverter.convertToEntity(req.body);
  const updaterResult: UpdateResult = await groupService.update(group);

  if (!updaterResult) {
    res.sendStatus(404);
  } else {
    res.send("Updated");
  }
});

groupRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.sendStatus(400);
  }
  const deleteResult: DeleteResult = await groupService.delete(id);

  if (!deleteResult) {
    res.sendStatus(404);
  } else {
    res.send("Deleted");
  }
});

groupRouter.post("/:groupId/:userId", async (req, res) => {
  const groupId = Number(req.params.groupId);
  if (Number.isNaN(groupId)) {
    res.sendStatus(400);
  }

  const userId = Number(req.params.userId);
  if (Number.isNaN(userId)) {
    res.sendStatus(400);
  }
  const isAdded: boolean = await groupService.addUserToGroup(groupId, userId);

  if (!isAdded) {
    res.sendStatus(400);
  } else {
    res.send("Added");
  }
});

groupRouter.delete("/:groupId/:userId", async (req, res) => {
  const groupId = Number(req.params.groupId);
  if (Number.isNaN(groupId)) {
    res.sendStatus(400);
  }

  const userId = Number(req.params.userId);
  if (Number.isNaN(userId)) {
    res.sendStatus(400);
  }
  const isDeleted: boolean = await groupService.deleteUserFromGroup(groupId, userId);

  if (!isDeleted) {
    res.sendStatus(400);
  } else {
    res.send("Deleted");
  }
});

export default groupRouter;
