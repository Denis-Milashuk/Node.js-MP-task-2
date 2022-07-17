import "dotenv/config";
import express from "express";
import userRouter from "./src/router/UserRouter";
import groupRouter from "./src/router/GroupRouter";
import { morganLogger } from "./src/middleware/morganLogger";
import { errorHandler } from "./src/middleware/errorHandler";
import { unhandledErrorLogger } from "./src/middleware/unhandledErrorLogger";
import {logger} from "./src/logging/winstonLogger";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(morganLogger);

app.use("/users", userRouter);
app.use("/groups", groupRouter);

app.use(unhandledErrorLogger);
app.use(errorHandler);

app.listen(PORT, () => logger.info(`The server has started on PORT: ${PORT}`));
