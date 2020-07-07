const blogsRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }

  return null;
};

//get all blogs
blogsRouter.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  res.json(allBlogs);
});

//create new blog
blogsRouter.post("/", async (req, res) => {
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken) {
    return res.status(404).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const newBlog = new Blog(req.body);

  if (!newBlog.title && !newBlog.url) {
    return res.status(400).end();
  }

  const blogSaved = await newBlog.save();

  user.blogs = user.blogs.concat(blogSaved._id);
  await user.save();

  res.status(200).json(blogSaved);
});

//get single blog
blogsRouter.get("/:id", async (req, res) => {
  // console.log(req.params.id);

  const blog = await Blog.find({ _id: req.params.id });

  blog ? res.json(blog) : res.status(404).end();
});

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.deleteOne({ _id: req.params.id });

  return res.status(200).end();
});

blogsRouter.put("/:id", async (req, res) => {
  await Blog.updateOne({ _id: req.params.id }, { ...req.body }, () => {
    return res.status(200).end();
  });
});

module.exports = blogsRouter;
