const express = require("express");

const User = require("../models/user.js");
const auth = require("../middlewares/auth.js");

const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token, message: "New Account Created!" });
  } catch (e) {
    console.log(e);
    if (user.password.length < 8) {
      res.status(500).send({
        message: "Password has to be minimum 8 characters",
      });
    } else if (e.keyPattern.username === 1) {
      res.status(500).send({ message: "Username already taken!" });
    } else {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(500).send({ message: "Unable to login" });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send({ message: "Logged Out" });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    const { _id, username, name } = req.user;
    res.send({ _id, username, name });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/users/delete", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send({
      message: "Your account was deleted along with all your data",
    });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
