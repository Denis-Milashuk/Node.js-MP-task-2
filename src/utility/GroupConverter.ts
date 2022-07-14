import { Converter } from "./Converter";
import { GroupEntity } from "../model/entity/GroupEntity";
import { GroupDto } from "../model/dto/GroupDto";
import userConverter from "../utility/UserConverter";

class GroupConverter extends Converter<GroupEntity, GroupDto> {
  public convertToDto(entity: GroupEntity): GroupDto {
    return {
      id: entity.id.toString(),
      name: entity.name,
      permissions: entity.permissions,
      users: entity.users.map((user) => userConverter.convertToDto(user)),
    };
  }

  public convertToEntity(dto: GroupDto): GroupEntity {
    const groupEntity = new GroupEntity();
    if (dto.id) {
      groupEntity.id = Number(dto.id);
    }
    groupEntity.name = dto.name;
    groupEntity.permissions = dto.permissions;
    groupEntity.users = dto.users?.map((user) => userConverter.convertToEntity(user));

    return groupEntity;
  }
}

export default new GroupConverter();
