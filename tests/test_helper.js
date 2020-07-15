const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Test1",
    author: "Tester",
    url: "test.com",
    likes: 12,
    user: "5f0dd1c5d3ac530be0b5456a",
  },
  {
    title: "Test2",
    author: "Tester2",
    url: "test2.com",
    likes: 16,
    user: "5f0dd1c5d3ac530be0b5456a",
  },
];

const user = {
  blogs: [],
  name: "bob",
  username: "bobcho",
  password: 11111,
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: "laba duba",
    author: "stancho",
    url: "fgsdgs.com",
    likes: 69,
  });

  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDB = async () => {
  const all = await Blog.find({});

  return all.map((b) => b.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDB,
  user,
};
