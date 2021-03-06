const blogsRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

// const getTokenFrom = (req) => {
//   const authorization = req.get("authorization");

//   if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
//     return authorization.substring(7);
//   }

//   return null;
// };

//get all blogs
blogsRouter.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});

  res.json(allBlogs);
});

//create new blog
blogsRouter.post("/", async (req, res) => {
  // const token = getTokenFrom(req);
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!req.token || !decodedToken) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const newBlog = new Blog(req.body);

  if (!newBlog.title || !newBlog.url) {
    return res.status(400).json({ error: "the blog must have title and url" });
  }

  if (!newBlog.likes) {
    newBlog.likes = 0;
  }

  if (req.body.user === decodedToken.id) {
    const blogSaved = await newBlog.save();

    user.blogs = user.blogs.concat(blogSaved._id);
    await user.save();

    return res.status(200).json(blogSaved);
  }

  res.status(401).json({ error: "cannot add blogs to another user" });
});

//get single blog
blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.find({ _id: req.params.id });

  blog ? res.json(blog) : res.status(404).end();
});

//delete blog
blogsRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken)
    return res.status(401).json({ error: "Missing web token" });

  if (blog.user.toString() === decodedToken.id) {
    const result = await Blog.deleteOne({ _id: blog._id });

    return res.json(result);
  }

  return res
    .status(401)
    .send({ error: "Cannot delete blog that does not belong to you!" });
});

blogsRouter.put("/:id", async (req, res) => {
  const result = await Blog.updateOne({ _id: req.params.id }, { ...req.body });

  return res.json(result);
});

blogsRouter.get("/:id/comments", async (req, res) => {
  const [blog] = await Blog.find({ _id: req.params.id });

  return res.send({ comments: blog.comments });
});

blogsRouter.post("/:id/comments", async (req, res) => {
  const [blog] = await Blog.find({ _id: req.params.id });

  blog.comments = blog.comments.concat(req.body.comment);

  await blog.save();

  return res.status(200).json(blog);
});

module.exports = blogsRouter;
