const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

//get all blogs
blogsRouter.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});

  res.json(allBlogs);
});

//create new blog
blogsRouter.post("/", async (req, res) => {
  const newBlog = new Blog(req.body);

  if (!newBlog.title && !newBlog.url) {
    return res.status(400).end();
  }

  const blogSaved = await newBlog.save();

  res.status(200).json(blogSaved);
});

//get single blog
blogsRouter.get("/:id", async (req, res) => {
  // console.log(req.params.id);

  const blog = await Blog.find({ _id: req.params.id });

  res.json(blog);
});

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (req, res) => {
  Blog.updateOne({ _id: req.params.id }, { ...req.body }, () => {
    return res.status(204).end();
  });
});

module.exports = blogsRouter;
