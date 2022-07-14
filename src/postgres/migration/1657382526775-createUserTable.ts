import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { SqlReader } from "node-sql-reader";
import * as path from "path";

export class createUserTable1657382526775 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase("nodejs_task3", true);
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "bigint",
            isPrimary: true,
            primaryKeyConstraintName: "PK_users_id",
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "login",
            type: "varchar",
            isNullable: false,
            length: "150",
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "age",
            type: "int",
            isNullable: false,
          },
          {
            name: "is_deleted",
            type: "boolean",
            isNullable: false,
            default: false,
          },
        ],
        indices: [
          {
            name: "user_id_index",
            columnNames: ["id"],
          },
        ],
      }),
      true
    );

    const queries: string[] = SqlReader.readSqlFile(path.join(__dirname, "sql", "data-1.sql"));
    for (const query of queries) {
      await queryRunner.query(query);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
