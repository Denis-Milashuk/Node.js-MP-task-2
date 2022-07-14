import { UserEntity } from "../model/entity/UserEntity";
import { UserDto } from "../model/dto/UserDto";
import { Converter } from "./Converter";

class UserConverter extends Converter<UserEntity, UserDto> {
  public convertToDto(entity: UserEntity): UserDto {
    return {
      id: entity.id.toString(),
      login: entity.login,
      password: entity.password,
      age: entity.age,
      isDeleted: entity.isDeleted,
    };
  }

  public convertToEntity(dto: UserDto): UserEntity {
    const entity = new UserEntity();
    if (dto.id) {
      entity.id = Number(dto.id);
    }
    entity.login = dto.login;
    entity.password = dto.password;
    entity.age = dto.age;
    entity.isDeleted = dto.isDeleted;

    return entity;
  }
}

export default new UserConverter();
