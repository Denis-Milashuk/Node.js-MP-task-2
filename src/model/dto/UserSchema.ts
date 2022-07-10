import {UserDto} from "./UserDto";
import {JSONSchemaType} from "ajv";

export const userSchema: JSONSchemaType<UserDto> = {
  type: "object",
  properties: {
    id: {type: "string"},
    login: {type: "string"},
    password: {type: "string", pattern: "^\\w+$"},
    age: {type: "number", minimum: 4, maximum: 130},
    isDeleted: {type: "boolean"},
  },
  required: ["id", "login", "password", "age", "isDeleted"],
};
