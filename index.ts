import "dotenv/config";
import express from "express";
import userRouter from "./src/router/UserRouter";
import groupRouter from "./src/router/GroupRouter";

const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());

app.use("/users", userRouter);
app.use("/groups", groupRouter);

app.listen(PORT, () => console.log(`The server has started on PORT: ${PORT}`));
