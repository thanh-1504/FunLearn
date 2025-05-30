const cors = require("cors");
const express = require("express");
const userRouter = require("./src/routers/userRouter");
const courseRouter = require("./src/routers/courseRouter");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://funstudy.netlify.app"],
  })
);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
// app.use("/api/v1/?",timkiem_goiyRouter);
module.exports = app;
