import express from "express";
import userRouter from "./src/router/UserRouter";
const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());

app.use("/users", userRouter);

app.listen(PORT, () => console.log(`The server has started on PORT: ${PORT}`));
