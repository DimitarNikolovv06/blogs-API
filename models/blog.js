const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const blogSchema = mongoose.Schema({
  title: String,
  author: {
    type: String,
    unique: true,
  },
  url: String,
  likes: Number,
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AuthorID",
  },
});

blogSchema.set("toJSON", {
  transform: (doc, retDoc) => {
    retDoc.id = retDoc._id.toString();
    delete retDoc._id;
    delete retDoc.__v;
  },
});

blogSchema.plugin(uniqueValidator);

module.exports = new mongoose.model("Blog", blogSchema);
