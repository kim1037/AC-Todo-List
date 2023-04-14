const express = require("express");
const router = express.Router();
const User = require("../../models/user");
// 引用 passport
const passport = require("passport");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/login",
  passport.authenticate("local", {
    //local是passport strategy
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "All fields are required." });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "Password and confirmPassword must be same." });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ message: `The email already exists.` });
        return res.render("register", {
          errors,
          name,
          email,
          password,
          confirmPassword,
        });
      }
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => User.create({ name, email, password: hash }))
        .then(() => res.redirect("/"))
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Logout success!");
  res.redirect("/users/login");
});

module.exports = router;
