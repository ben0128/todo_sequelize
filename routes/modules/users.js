const express = require("express");
const router = express.Router();
// const User = require("../../models/user");
const passport = require("passport");
const bcryptUtil = require("../../utils/bcryptUtil")
const db = require("../../models");
const User = db.User;

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(password)
  User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        console.log("User already exists");
        return res.render("register", {
          name,
          email,
          password,
          confirmPassword,
        });
      }
    })
    .then(()=> {
      return bcryptUtil.hashPassword(password);
    })
    .then((hash)=>{
      User.create({
        name,
        email,
        password: hash
      })
    })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err))
});

router.get("/logout", (req, res) => {
  res.send("logout");
});

module.exports = router;