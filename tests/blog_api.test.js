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

    const res = await api.post("/api/blogs", newBlog);

    expect(res.status).toBe(200);
  });

  test("delete blog", async () => {
    const blogsInDB = await helper.blogsInDB();

    await api.delete(`/api/blogs/${blogsInDB[0].id}`).expect(200);

    const updatedBlogsInDB = await helper.blogsInDB();

    expect(updatedBlogsInDB).toHaveLength(blogsInDB.length - 1);
  });

  test("update blog", async () => {
    const blogsInDB = await helper.blogsInDB();

    blogsInDB[0].author = "Bethoven";

    await api.put(`/api/blogs/${blogsInDB[0].id}`, blogsInDB[0]).expect(200);
  });

  test("invalid id returns 404", async () => {
    const invalidId = await helper.nonExistingId();

    api.get(`/api/blogs/${invalidId}`).expect(404);
  });

  test("test returns 400 if data is invalid", async () => {
    const blog = {
      author: "aaa",
    };

    const blogObj = new Blog(blog);

    await api.post("/api/blogs").send(blogObj).expect(400);

    const allBlogs = await helper.blogsInDB();

    expect(allBlogs).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
