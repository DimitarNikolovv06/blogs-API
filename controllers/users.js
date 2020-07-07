const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });

  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  if (req.body.password.length < 3) {
    return res.status(401).send({ error: "Invalid password " });
  }

  const saltRounds = 10;
  const password = await bcrypt.hash(req.body.password, saltRounds);

  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password,
  });

  const result = await user.save();

  return res.json(result);
});

module.exports = usersRouter;
