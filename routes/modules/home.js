const express = require("express");
const router = express.Router();
const Todo = require("../../models/todo");

router.get("/", (req, res) => {
  const userId = req.user._id;

  return Todo.findAll({ 
      where: userId,
      raw: true,
      nest: true
    })
    .then((todos) => {return res.render("index", { todos })})
    .catch((error) => { return res.status(422).json(error) });
});

module.exports = router;