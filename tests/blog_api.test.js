const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((b) => new Blog(b));

  const promiseArray = blogObjects.map((promise) => promise.save());

  await Promise.all(promiseArray);
});
/*Promise.all runs promises in parallel if they have to be executed in particular order it can be used a for...of block:

for(let blog of helper.initialBlogs){
  let blogObject = new Blog(blog)

  await blogObject.save()
}
*/

describe("Blogs backend tests:", () => {
  test("get blogs", async () => {
    const res = await api.get("/api/blogs");

    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength(helper.initialBlogs.length);
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
