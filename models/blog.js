const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  comments: Array,
});

blogSchema.set("toJSON", {
  transform: (doc, retDoc) => {
    retDoc.id = retDoc._id.toString();
    delete retDoc._id;
    delete retDoc.__v;
  },
});

blogSchema.pre("find", function (next) {
  this.populate("User");
  this.populate("Blog");

  next();
});

blogSchema.plugin(uniqueValidator);

module.exports = new mongoose.model("Blog", blogSchema);
