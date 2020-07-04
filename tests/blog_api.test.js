const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const initialBlogs = require("../utils/test_helper");
const Blog = require("../models/blog");
const logger = require("../utils/logger");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObj = new Blog(initialBlogs[0]);
  await blogObj.save();

  blogObj = new Blog(initialBlogs[1]);
  await blogObj.save();
});

test("Blogs", async () => {
  const res = await api.get("/api/blogs");

  expect(res.type).toBe("application/json");
  expect(res.body).toHaveLength(2);
});

test("id defined", async () => {
  const res = await api.get("/api/blogs");

  res.body.forEach((b) => expect(b.id).toBeDefined());
  //   expect(res.body[0].id).toBeDefined();
});

test("post blog", async () => {
  const newBlog = new Blog({
    title: "posts",
    author: "me",
    url: "gdfgdgs.com",
    likes: 1,
  });

  await api.post("/api/blogs", newBlog).expect(200);
});

afterAll(() => {
  mongoose.connection.close();
});
