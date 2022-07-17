import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../model/entity/UserEntity";
import { GroupEntity } from "../model/entity/GroupEntity";
import { logger } from "../logging/winstonLogger";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "nodejs_task3",
  synchronize: false,
  logging: true,
  entities: [UserEntity, GroupEntity],
  subscribers: [],
  migrations: [__dirname + "/migration/*.js"],
  migrationsRun: true,
});

AppDataSource.initialize().then(() => logger.info("Database is connected"));

export default AppDataSource;
