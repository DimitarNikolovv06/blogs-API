const totalLikes = (arr) => {
  return arr.reduce((sum, cur) => sum + cur.likes, 0);
};

const favoriteBlog = (arr) => {
  return arr.reduce((max, cur) => (max.likes < cur.likes ? cur : max), {
    likes: 0,
  });
};

const mostBlogs = (arr) => {
  const hash = [];

  arr.forEach((cur) => {
    const authorObj = hash.find((a) => a.author === cur.author);

    if (!authorObj) {
      hash.push({
        author: cur.author,
        blogs: 1,
      });
    } else {
      authorObj.blogs += 1;
    }
  });

  return hash.reduce((acc, cur) => (acc.blogs < cur.blogs ? cur : acc), {
    author: "",
    blogs: 0,
  });
};

const mostLikes = (arr) => {
  return arr
    .reduce((acc, cur) => {
      const authorObj = acc.find((a) => a.author === cur.author);

      if (!authorObj) {
        return [...acc, { author: cur.author, likes: cur.likes }];
      } else {
        authorObj.likes += cur.likes;
        return [...acc];
      }
    }, [])
    .reduce((acc, cur) => (acc.likes < cur.likes ? cur : acc), {
      author: "",
      likes: 0,
    });
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
