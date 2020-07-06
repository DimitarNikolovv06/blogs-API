const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Test1",
    author: "Tester",
    url: "test.com",
    likes: 12,
  },
  {
    title: "Test2",
    author: "Tester2",
    url: "test2.com",
    likes: 16,
  },
];

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
};
