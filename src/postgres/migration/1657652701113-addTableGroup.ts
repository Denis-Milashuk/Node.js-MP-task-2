import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { SqlReader } from "node-sql-reader";
import path from "path";
import { Permission } from "../../model/enum/Permission";

export class addTableGroup1657652701113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "groups",
        columns: [
          {
            name: "id",
            type: "bigint",
            isPrimary: true,
            primaryKeyConstraintName: "PK_group_id",
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
            length: "150",
          },
          {
            name: "permissions",
            type: "varchar",
            isNullable: false,
            default: `'${Permission[Permission.READ]}'`,
          },
        ],
        indices: [
          {
            name: "group_id_index",
            columnNames: ["id"],
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "groups_entities",
        columns: [
          {
            name: "group_id",
            type: "bigint",
            isPrimary: true,
            primaryKeyConstraintName: "PK_group_entity_id",
          },
          {
            name: "user_id",
            type: "bigint",
            isPrimary: true,
            primaryKeyConstraintName: "PK_group_entity_id",
          },
        ],
        foreignKeys: [
          {
            name: "FK_groups",
            columnNames: ["group_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "groups",
            onDelete: "CASCADE",
          },
          {
            name: "FK_users",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    const queries: string[] = SqlReader.readSqlFile(path.join(__dirname, "sql", "data-2.sql"));
    for (const query of queries) {
      await queryRunner.query(query);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("groups_entities");
    await queryRunner.dropTable("groups");
  }
}
