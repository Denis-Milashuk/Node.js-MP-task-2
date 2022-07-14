import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "../enum/Permission";
import { UserEntity } from "./UserEntity";

@Entity("groups")
export class GroupEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 150 })
  name: string;

  @Column({
    type: "enum",
    enum: Permission,
    default: [Permission.READ],
  })
  permissions: Permission[];

  @ManyToMany(() => UserEntity, { cascade: ["remove", "insert", "update"], eager: true })
  @JoinTable({
    name: "groups_entities",
    joinColumn: {
      name: "group_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_group_to_entities_group_id",
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_group_to_entities_user_id",
    },
  })
  users: UserEntity[];
}
