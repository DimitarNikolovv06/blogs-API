const logger = require("./logger");
const jwt = require("jsonwebtoken");

const reqLogger = (req, res) => {
  logger.info("Method", req.method);
  logger.info("Body", req.body);
  logger.info("Status", req.status);
  logger.info("Path", req.path);

  logger.info("---");
};

const getToken = (req, res, next) => {
  const auth = req.get("authorization");

  if (auth && auth.startsWith("bearer ")) {
    req.token = auth.substring(7);
  }

  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Not Found" }).end();
};

const errorHandler = (err, req, res, next) => {
  logger.error(req.message);

  if (err.name === "CastError") {
    res.status(400).send("malformated id").end();
  } else if (err.name === "ValidationError") {
    res.status(400).send({ error: err.message });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({ error: "Invalid Token" });
  }

  next(err);
};

module.exports = {
  reqLogger,
  unknownEndpoint,
  errorHandler,
  getToken,
};
