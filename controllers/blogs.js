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

  const blogSaved = await newBlog.save();

  res.status(200).json(blogSaved);
});

//get single blog
blogsRouter.get("/:id", async (req, res) => {
  // console.log(req.params.id);

  const blog = await Blog.find({ _id: req.params.id });

  res.json(blog);
});

module.exports = blogsRouter;
