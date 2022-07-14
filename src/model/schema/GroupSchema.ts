import { JSONSchemaType } from "ajv";
import { GroupDto } from "../dto/GroupDto";
import { userSchema } from "./UserSchema";
import { Permission } from "../enum/Permission";

export const groupSchema: JSONSchemaType<GroupDto> = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    users: {
      type: "array",
      items: userSchema,
    },
    permissions: {
      type: "array",
      minItems: 0,
      items: {
        type: "string",
        enum: Object.values(Permission),
      },
    },
  },
  required: ["name"],
};
