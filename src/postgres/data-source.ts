import "reflect-metadata";
import {DataSource} from "typeorm";
import {UserEntity} from "../model/entity/UserEntity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "onboarding",
  password: "",
  database: "nodejs_task3",
  synchronize: false,
  logging: true,
  entities: [UserEntity],
  subscribers: [],
  migrations: [__dirname + "/migration/*.js"],
  migrationsRun: true,
});

AppDataSource.initialize()
    .then(() => console.log("Database started"))
    .catch((error) => console.log(error));

export default AppDataSource;
