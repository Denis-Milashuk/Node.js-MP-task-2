import {UserEntity} from "../model/entity/UserEntity";
import AppDataSource from "../postgres/data-source";
import {FindManyOptions, InsertResult, Like, Repository, UpdateResult} from "typeorm";

class UserService {
  private userRepository: Repository<UserEntity> = AppDataSource.getRepository(UserEntity);

  public async getById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({
      id: id,
      isDeleted: false,
    });
  }

  public async create(user: UserEntity): Promise<InsertResult> {
    return this.userRepository.insert(user);
  }

  public async update(updatedUser: UserEntity): Promise<UpdateResult> {
    return this.userRepository.update(updatedUser.id, updatedUser);
  }

  public async getAutoSuggestUsers(loginSubstring?: string, limit?: number): Promise<UserEntity[]> {
    const queryConditions: FindManyOptions<UserEntity> = {};

    if (loginSubstring) {
      queryConditions.where = {
        login: Like(`%${loginSubstring}%`),
      };
    }

    if (limit) queryConditions.take = limit;

    return this.userRepository.find(queryConditions);
  }

  public async softDelete(id: number): Promise<boolean> {
    const userEntity: UserEntity | null = await this.userRepository.findOneBy({id: id});
    if (!userEntity || userEntity.isDeleted) return false;

    userEntity.isDeleted = true;
    await this.userRepository.update(userEntity.id, userEntity);
    return true;
  }
}

export default new UserService();
