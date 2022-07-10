import {UserEntity} from "../model/entity/UserEntity";
import {UserDto} from "../model/dto/UserDto";

export class UserConverter {
  public static convertToDto(entity: UserEntity): UserDto {
    return {
      id: entity.id.toString(),
      login: entity.login,
      password: entity.password,
      age: entity.age,
      isDeleted: entity.isDeleted,
    };
  }

  public static convertToEntity(dto: UserDto): UserEntity {
    const entity = new UserEntity();
    entity.id = Number(dto.id);
    entity.login = dto.login;
    entity.password = dto.password;
    entity.age = dto.age;
    entity.isDeleted = dto.isDeleted;

    return entity;
  }
}
