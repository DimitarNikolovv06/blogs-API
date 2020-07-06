const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./controllers/blogs");
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
app.use("/api/blogs", router);
app.use(middleware.reqLogger);

app.use(middleware.unknowEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
