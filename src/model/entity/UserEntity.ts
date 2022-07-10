import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export class UserEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 150})
  login: string;

  @Column("varchar")
  password: string;

  @Column("int")
  age: number;

  @Column("boolean", {default: false})
  isDeleted: boolean;
}
