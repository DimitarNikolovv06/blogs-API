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
});
userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (doc, retDoc) => {
    retDoc.id = doc._id.toString();

    delete retDoc._id;
    delete retDoc.__v;
  },
});

module.exports = new mongoose.model("User", userSchema);
