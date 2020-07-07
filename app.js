const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => logger.info("connected"))
  .catch(() => logger.error("con error"));

app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);
app.use(middleware.reqLogger);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
