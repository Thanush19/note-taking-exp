const express = require("express");

const Note = require("../models/note.js");
const User = require("../models/user.js");
const auth = require("../middlewares/auth");

const router = new express.Router();

router.patch("/edit/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["content", "tag", "star"]; // Update the allowed fields

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const note = await Note.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!note) {
      return res.status(404).send();
    }

    updates.forEach((update) => (note[update] = req.body[update]));
    await note.save();

    res.send({ message: "Note updated successfully", note });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send({ error: "Internal Server Error", details: e.message });
  }
});
router.get("/stats", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const totalNotes = await Note.countDocuments({ owner: userId });
    const totalStarredNotes = await Note.countDocuments({
      owner: userId,
      star: true,
    });

    const tags = await Note.distinct("tag", { owner: userId });

    const user = await User.findById(userId);
    const username = user.username;

    res.send({
      totalNotes,
      totalStarredNotes,
      tags,
      username,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/notes", auth, async (req, res) => {
  const note = new Note({
    content: req.body.content,
    tag: req.body.tag,
    star: req.body.star,
    owner: req.user._id,
  });

  try {
    await note.save();
    res.status(201).send({ note, message: "Note Saved" });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/notes", auth, async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user._id });

    console.log(notes);

    res.send(notes);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/notes/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById({ _id: req.params.id });
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/notes/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id });

    if (!note) {
      return res.status(404).send();
    }
    res.send({ message: "Note was deleted" });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
