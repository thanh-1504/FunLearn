const express = require("express");
const userRouter = require("./src/routers/userRouter");
const app = express();
app.use(express.json());
app.use("/api/v1/users", userRouter);
module.exports = app;
