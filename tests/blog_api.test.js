const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const initialBlogs = require("../utils/test_helper");
const Blog = require("../models/blog");
const logger = require("../utils/logger");

const api = supertest(app);

// beforeEach(async () => {
//   await Blog.deleteMany({});

//   let blogObj = new Blog(initialBlogs[0]);
//   await blogObj.save();

//   blogObj = new Blog(initialBlogs[1]);
//   await blogObj.save();
// });

test("Blogs", async () => {
  await api.get("/api/blogs").expect(200);
});

afterAll(() => {
  mongoose.connection.close();
});
