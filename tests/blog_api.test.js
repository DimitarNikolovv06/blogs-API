const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const initialBlogs = require("../utils/test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObj = new Blog(initialBlogs[0]);
  await blogObj.save();

  blogObj = new Blog(initialBlogs[1]);
  await blogObj.save();
});

describe("Blogs backend tests:", () => {
  test("get blogs", async () => {
    const res = await api.get("/api/blogs");

    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength(2);
  });

  test("id defined", async () => {
    const res = await api.get("/api/blogs");

    res.body.forEach((b) => expect(b.id).toBeDefined());
  });

  test("post blog", async () => {
    const newBlog = new Blog({
      author: "a",
    });

    if (!newBlog.likes) {
      newBlog.likes = 0;

      expect(newBlog.likes).toBe(0);
    }

    if (!newBlog.title && !newBlog.url) {
      return api.post("/api/blogs", newBlog).expect(400);
    }

    await api.post("/api/blogs", newBlog).expect(200);
  });

  test("delete blog", () => {
    api.delete(`/api/blogs/:id`).expect(204);
  });

  test("update blog", () => {
    api.put("/blog/api/:id").expect(204);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
