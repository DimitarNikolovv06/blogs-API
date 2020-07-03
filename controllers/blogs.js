const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", (req, res) => {
  Blog.find({})
    .then((b) => res.json(b))
    .catch((err) => logger.info(err));
});

blogsRouter.post("/", (req, res) => {
  const newBlog = new Blog(req.body);

  newBlog
    .save()
    .then((blog) => res.status(200).json(blog))
    .catch((err) => logger.error(err));
});

blogsRouter.get("/:id", (req, res) => {
  console.log(req.params.id);

  Blog.find({ _id: req.params.id })
    .then((result) => res.json(result))
    .catch((err) => logger.error(err));
});

module.exports = blogsRouter;
