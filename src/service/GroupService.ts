import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { GroupEntity } from "../model/entity/GroupEntity";
import AppDataSource from "../postgres/data-source";
import { UserEntity } from "../model/entity/UserEntity";
import userService from "../service/UserService";

class GroupService {
  private groupRepository: Repository<GroupEntity> = AppDataSource.getRepository(GroupEntity);

  public async find(): Promise<GroupEntity[]> {
    return this.groupRepository.find();
  }

  public async findById(id: number): Promise<GroupEntity | null> {
    return this.groupRepository.findOneBy({
      id: id,
    });
  }

  public async create(group: GroupEntity): Promise<GroupEntity> {
    console.log("Saved entity: " + JSON.stringify(group));
    return this.groupRepository.save(group);
  }

  public async update(group: GroupEntity): Promise<UpdateResult> {
    return this.groupRepository.update(group.id, group);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return this.groupRepository.delete(id);
  }

  public async addUserToGroup(groupId: number, userId: number): Promise<boolean> {
    const group: GroupEntity | null = await this.findById(groupId);
    if (!group) {
      return false;
    }

    const user: UserEntity | null = await userService.getById(userId);
    if (!user) {
      return false;
    }

    if (group.users.map((user) => user.id).includes(user.id)) {
      return false;
    }

    group.users.push(user);
    await this.groupRepository.save(group);
    return true;
  }

  public async deleteUserFromGroup(groupId: number, userId: number): Promise<boolean> {
    const group: GroupEntity | null = await this.findById(groupId);
    if (!group) {
      return false;
    }

    const deletedUser: UserEntity | null = await userService.getById(userId);
    if (!deletedUser) {
      return false;
    }

    if (!group.users.map((user) => user.id).includes(deletedUser.id)) {
      return false;
    }

    group.users = group.users.filter((user) => user.id !== deletedUser.id);
    console.log(deletedUser.id);
    console.log(group);
    await this.groupRepository.save(group);
    return true;
  }
}

export default new GroupService();
