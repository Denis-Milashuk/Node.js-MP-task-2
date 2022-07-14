import { UserDto } from "./UserDto";
import { Permission } from "../enum/Permission";

export type GroupDto = {
  id: string;
  name: string;
  permissions: Permission[];
  users: UserDto[];
};
