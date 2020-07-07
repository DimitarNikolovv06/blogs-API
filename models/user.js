const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    unique: true,
    required: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});
userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (doc, retDoc) => {
    retDoc.id = doc._id.toString();

    delete retDoc._id;
    delete retDoc.__v;
    delete retDoc.password;
  },
});

module.exports = new mongoose.model("User", userSchema);
