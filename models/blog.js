const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (doc, retDoc) => {
    retDoc.id = retDoc._id.toString();
    delete retDoc._id;
    delete retDoc.__v;
  },
});

module.exports = new mongoose.model("Blog", blogSchema);
