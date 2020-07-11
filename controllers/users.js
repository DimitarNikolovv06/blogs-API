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

usersRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  return user
    ? res.json(user)
    : res.status(404).send({ error: "not found user" });
});

usersRouter.get("/?username=:username", async (req, res) => {
  const user = await User.find({}).filter(
    (u) => u.username === req.params.username
  );

  return user ? res.json(user) : res.status(404).send("not found");
});

module.exports = usersRouter;
