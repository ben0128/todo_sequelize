const express = require("express");
const router = express.Router();
const Todo = require("../../models/todo");

router.get("/", (req, res) => {
  const userId = req.user._id;

  return Todo.findAll({ where: userId })
    .sort(sortOption)
    .then((todo) => res.render("index", { todo }))
    .catch((error) => console.error(error));
});

module.exports = router;
