const logger = require("./logger");

const reqLogger = (req, res) => {
  logger.info("Method", req.method);
  logger.info("Body", req.body);
  logger.info("Status", req.status);
  logger.info("Path", req.path);

  logger.info("---");
};

const unknowEndpoint = (req, res) => {
  return res.status(404).send("Not Found");
};

const errorHandler = (err, req, res, next) => {
  logger.error(req.message);

  if (err.name === "CastError") {
    res.status(400).send("malformated id").end();
  } else if (err.name === "ValidationError") {
    res.status(400).send({ error: err.message });
  }

  next(err);
};

module.exports = {
  reqLogger,
  unknowEndpoint,
  errorHandler,
};
