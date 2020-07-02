const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", (req, res) => {
  Blog.find({})
    .then((b) => res.json(b))
    .catch((err) => logger.info(err));
});

module.exports = blogsRouter;
